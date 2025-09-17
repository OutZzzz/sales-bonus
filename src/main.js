/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
   const { discount, sale_price, quantity } = purchase;
   let disc = 1 - (discount / 100)
   return (sale_price * quantity) * disc
}

let options = {
    calculateSimpleRevenue,
    calculateBonusByProfit
}


/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
    const { profit } = seller;
    if (index == 0) {
        return profit * 0.15
    } else if (index == 1 || index == 2) {
        return profit * 0.10
    } else if (index == total - 1) {
        return 0
    }
    return profit * 0.05
}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {

    const dataCollection = [data.sellers, data.products, data.purchase_records]
    if (!data
        || !dataCollection.every(Array.isArray)
        || dataCollection.some(item => item.length === 0)
    ) {
        throw new Error('Некорректные входные данные')
    }

    const { calculateRevenue, calculateBonus } = options;
    if (
        ![calculateRevenue, calculateBonus].every(item => typeof item === "function")
    ) {
        throw new Error('Проверьте что опции это функции')
    }

    const sellerStats = data.sellers.map(seller => (
    {
        id: seller.id,
        name: `${seller.first_name} ${seller.last_name}`,
        revenue: 0,
        profit: 0,
        sales_count: 0,
        products_sold: {}
    }
    ));

    const sellerIndex = Object.fromEntries(sellerStats.map(item => [item.id, item]));
    const productIndex = Object.fromEntries(data.products.map(item => [item.sku, item]));

    data.purchase_records.forEach(record => {
        const seller = sellerIndex[record.seller_id];
        seller.sales_count++
        seller.revenue += record.total_amount;

        record.items.forEach(item => {
            const product = productIndex[item.sku];
            const cost = product.purchase_price *  item.quantity;
            const revenue = calculateSimpleRevenue(item);
            const profit = revenue - cost
            seller.profit += profit;
            if (!seller.products_sold[item.sku]) {
                seller.products_sold[item.sku] = 0
            }
            seller.products_sold[item.sku]++
        })
    })

    sellerStats.sort((a, b) => {
        if (a.profit < b.profit) {
            return 1;
        } else if (a.profit > b.profit) {
            return -1;
        }
        return 0;
    })

    sellerStats.forEach((seller, index) => {
        seller.bonus = calculateBonus(index, sellerStats.length, seller)
        seller.top_products = Object.entries(seller.products_sold).map(([key, value]) => ({
            sku: key,
            quantity: value,
        })).sort((a, b) => {
        if (a.quantity < b.quantity) {
            return 1;
        } else if (a.quantity > b.quantity) {
            return -1;
        }
        return 0;
        }).slice(0, 10)
    })
    
    return sellerStats.map(seller => ({
        seller_id: seller.id,
        name: seller.name,
        revenue: +seller.revenue.toFixed(2),
        profit: +seller.profit.toFixed(2),
        sales_count: +seller.sales_count,
        top_products: seller.top_products,
        bonus: +seller.bonus.toFixed(2)
    }))
}

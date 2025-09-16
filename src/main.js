/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
   // @TODO: Расчет выручки от операции
   const { discount, sale_price, quantity } = purchase;
   let disc = 1 - (discount / 100)
   /* console.log('sale price:', sale_price, 'quantity:', quantity, 'discount:', disc) */
   return (sale_price * quantity) * disc
}

// @TODO: Подготовка промежуточных данных для сбора статистики
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
    // @TODO: Индексация продавцов и товаров для быстрого доступа
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
sellerStats.sort()
console.log(sellerStats)

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
    // @TODO: Расчет бонуса от позиции в рейтинге
    const { profit } = seller;
}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
    // @TODO: Проверка входных данных
    const dataCollection = [data.sellers, data.products, data.purchase_records]
    if (!data
        || !dataCollection.every(Array.isArray)
        || dataCollection.some(item => item.length === 0)
    ) {
        throw new Error('Некорректные входные данные')
    }
    // @TODO: Проверка наличия опций
    try {
        const { calculateRevenue, calculateBonus } = options;
    } catch (Error) {
        console.log('Проверьте что options - это объект')
    }
    if (
        ![calculateRevenue, calculateBonus].every(item => typeof item === "function")
    ) {
        throw new Error('Проверьте что опции это функции')
    }
    // @TODO: Подготовка промежуточных данных для сбора статистики
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
    // @TODO: Индексация продавцов и товаров для быстрого доступа
    const sellerIndex = Object.fromEntries(sellerStats.map(item => [item.id, item]));
    const productIndex = Object.fromEntries(data.products.map(item => [item.sku, item]));
    // @TODO: Расчет выручки и прибыли для каждого продавца
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
    // @TODO: Сортировка продавцов по прибыли
    sellerStats.sort()
    // @TODO: Назначение премий на основе ранжирования
    
    // @TODO: Подготовка итоговой коллекции с нужными полями
}

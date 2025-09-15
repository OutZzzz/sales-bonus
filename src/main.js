/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
   // @TODO: Расчет выручки от операции
   const { discount, sale_price, quantity } = purchase;
   /* console.log(discount, sale_price, quantity) */
}

const itemsList = data.purchase_records.forEach((record) => {
    for (const item in record['items']) {
        calculateSimpleRevenue(record['items'][item]);
    }
   });

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

    // @TODO: Сортировка продавцов по прибыли

    // @TODO: Назначение премий на основе ранжирования

    // @TODO: Подготовка итоговой коллекции с нужными полями
}

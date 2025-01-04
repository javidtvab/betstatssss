const Sale = require('../models/Sale');

// Obtener estadísticas de ventas
const getSalesStatistics = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$amount' },
          totalTransactions: { $sum: 1 },
          averageSale: { $avg: '$amount' }
        }
      }
    ]);

    res.status(200).json(sales[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSalesStatistics };

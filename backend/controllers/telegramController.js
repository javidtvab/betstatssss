const User = require('../models/User');

// Configurar el canal de Telegram y el bot
const configureTelegram = async (req, res) => {
  const { telegramChannel, telegramBotToken } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      telegramChannel,
      telegramBotToken
    }, { new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { configureTelegram };

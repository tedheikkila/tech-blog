module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_plural: (word, amount) => {
    // format large numbers with commas & changes word(s)
    if (amount !==1) {
      return `${word}s`
    } return word
  },
 
};

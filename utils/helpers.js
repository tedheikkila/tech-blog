// format_date was used; format_plural was not
module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_plural: (word, amount) => {
    if (amount !==1) {
      return `${word}s`
    } return word
  },
 
};

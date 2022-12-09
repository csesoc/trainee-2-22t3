export function calculateTaskDate(week, term, year, uni) {
    let foundTerm;
    let newTime;
  
    for (let uniTerm of uni.terms) {
      // Find the correct term
      if (uniTerm.term === term) {
        let startDate = new Date(uniTerm.startDate * 1000);
        if (startDate.getFullYear() === year) {
          foundTerm = term;
          newTime = uniTerm.startDate;
        }
        break;
      }
    }
    if (foundTerm === undefined) {
      return { error: "uni does not have required term" };
    }
    if (newTime === undefined) {
      return { error: "startDate not in uni" };
    }
    // Calculate date
    let date = newTime + week * 7 * 24 * 60 * 60;
    return { date: date };
  }
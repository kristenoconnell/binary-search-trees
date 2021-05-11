const Queue = require("./Queue");

class StarshipEnterprise {
  constructor(officerId = null, officerName = null, reportTo = null) {
    this.officerId = officerId;
    this.officerName = officerName;
    this.reportTo = reportTo; // the officer that the new officer reports to
    this.leftReport = null;
    this.rightReport = null;
  }

  assignOfficer(officerId, officerName) {
    if (this.officerId === null) {
      this.officerId = officerId;
      this.officerName = officerName;
    } else {
      if (officerId < this.officerId) {
        if (this.leftReport === null) {
          this.leftReport = new StarshipEnterprise(officerId, officerName, this);
          //console.log("this left", this);
        } else {
          this.leftReport.assignOfficer(officerId, officerName);
        }
      }
      else if (officerId > this.officerId) {
        if (this.rightReport === null) {
          this.rightReport = new StarshipEnterprise(officerId, officerName, this);
        } else {
          this.rightReport.assignOfficer(officerId, officerName);
        }
      }
    }
 }

  findOfficersWithNoDirectReports(values = []) {
    if (this.leftReport === null && this.rightReport === null) {
      values.push(this.officerName);
    } 
    if (this.leftReport) {     this.leftReport.findOfficersWithNoDirectReports(values);
    }  
    if (this.rightReport) {   this.rightReport.findOfficersWithNoDirectReports(values);
    }
    return values;
  }

  listOfficersByExperience(officerNames = []) {
      if (this.rightReport) {
      officerNames = this.rightReport.listOfficersByExperience(officerNames);
    }
     officerNames.push(this.officerName);    
     if (this.leftReport) {
      officerNames = this.leftReport.listOfficersByExperience(officerNames);
    }

    return officerNames;
}

  listOfficersByRank(tree, rankedOfficers = {}) {
    const queue = new Queue();
    queue.enqueue(tree);
    let count = 1;
    let node = queue.dequeue();
    let currentLevel = 1;
    
    while (node) {
      
      currentLevel--;
      
      if (!rankedOfficers[count]) {
        rankedOfficers[count] = [];
      } 
      rankedOfficers[count].push(node.officerName);
    
      if (node.leftReport) {
        queue.enqueue(node.leftReport);
      }
      if (node.rightReport) {
        queue.enqueue(node.rightReport);
        }
      if (currentLevel === 0) {
        count++;
        currentLevel = count;
      }
       node = queue.dequeue();
    }
      return rankedOfficers;
  }
}





module.exports = StarshipEnterprise;

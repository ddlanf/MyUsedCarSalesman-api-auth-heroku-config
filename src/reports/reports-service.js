const ReportsService = {
    getAllReports(db){
        return db
            .from('myusedcarsalesman_reports as report')
            .select(
                'report.id',
                'report.message',
                'report.message_type',
                'report.date_sent',
                'report.user_id'
            )      
    },
    getById(db, id) {
        return ReportsService.getAllReports(db)
          .where('report.id', id)
          .first()
    },
    insertReport(db, newReport) {
        return db
          .insert(newReport)
          .into('myusedcarsalesman_reports')
          .returning('*')
          .then(([report]) => report)
          .then(report =>
            ReportsService.getById(db, report.id)
          )
    },
}

module.exports = ReportsService;
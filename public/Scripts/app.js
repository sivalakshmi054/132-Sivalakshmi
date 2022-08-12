var OEMSController = angular.module('OEMSController', ['ui.router', 'angucomplete-alt', 'smart-table', 'daypilot', 'frapontillo.bootstrap-duallistbox',  'ngSanitize','ckeditor']);
OEMSController.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Home');

    // $stateProvider
        $stateProvider

        .state('Home', {
            url: '/Home',
            templateUrl: 'LoginHome.html',
            controller: 'HomeController'
        })
        .state('GeneralSettings', {
            url: '/GeneralSettings',
            templateUrl: 'Views/Administration/IdSettings.html',
            controller: 'IdSettingsController'
        })
        
        .state('AssignRollNumber', {
            url: '/AssignRollNumber',
            templateUrl: 'Views/Student/AssignRollNumber.html',
            controller: 'AssignRollNumberController'
        })
        
        .state('AssignEnrollmentNumber', {
            url: '/AssignEnrollmentNumber',
            templateUrl: 'Views/Exam/AssignEnrollmentNumber.html',
            controller: 'AssignEnrollmentNumberController'
        })
        .state('Settings', {
            url: '/Settings',
            templateUrl: 'Views/Administration/Settings.html',
            controller: 'SettingsController'
        })
        .state('EditSettings', {
            url: '/EditSettings/:Id',
            templateUrl: 'Views/Administration/Settings.html',
            controller: 'SettingsController'
        })
        .state('StudentImport', {
            url: '/StudentImport',
            templateUrl: 'Views/Administration/StudentImport.html',
            controller: 'StudentImportController'
        })

        .state('Organiser', {
            url: '/Organiser',
            templateUrl: 'Views/Administration/AcademicYear.html',
            controller: 'AcademicYearController'
        })
        
        .state('CourseSection', {
            url: '/CourseSection',
            templateUrl: 'Views/Administration/CourseSection.html',
            controller: 'CourseSectionController'
        })

        .state('Grade', {
            url: '/Grade',
            templateUrl: 'Views/Administration/Grade.html',
            controller: 'GradeMasterController'
        })

        .state('Exam', {
            url: '/Exam',
            templateUrl: 'Views/Administration/Exam.html',
            controller: 'ExamController'
        })

        .state('Subject', {
            url: '/Subject',
            templateUrl: 'Views/Administration/Subject.html',
            controller: 'SubjectController'
        })

        .state('ExamSubject', {
            url: '/ExamSubject',
            templateUrl: 'Views/Administration/ExamSubject.html',
            controller: 'ExamSubjectController'
        })
        .state('WorkFlow', {
            url: '/WorkFlow',
            templateUrl: 'Views/Administration/WorkflowList.html',
            controller: 'WorkFlowController'
        })
        .state('WorkFlowCreate', {
            url: '/WorkFlowCreate/:Id',
            templateUrl: 'Views/Administration/WorkFlowCreate.html',
            controller: 'WorkFlowController'
        })
        .state('ManageLogins', {
            url: '/ManageLogins',
            templateUrl: 'Views/Settings/ManageLogins.html',
            controller: 'ManageLoginsController'
        })
        .state('Masters', {
            url: '/Masters',
            templateUrl: 'Views/Administration/MasterList.html',
            controller: 'DynamicMastercontroller'
        })
        .state('MenuPersonalize', {
            url: '/MenuPersonalize',
            templateUrl: 'Views/Settings/MenuPersonalize.html',
            controller: 'MenuPersonalizecontroller'
        })
        .state('RoleMapping', {
            url: '/RoleMapping',
            templateUrl: 'Views/Settings/Rolemapping.html',
            controller: 'UserRoleMappingController'
        })
        .state('MenuOverride', {
            url: '/MenuOverride',
            templateUrl: 'Views/Settings/MenuOverride.html',
            controller: 'MenuOverrideController'
        })
        .state('SchoolMaster', {
            url: '/SchoolMaster',
            templateUrl: 'Views/Administration/SchoolMaster.html',
            controller: 'SchoolMasterController'
        })
        .state('EditSchoolMaster', {
            url: '/EditSchoolMaster/:Id',
            templateUrl: 'Views/Administration/SchoolMaster.html',
            controller: 'SchoolMasterController'
        })

        //Human Resources

        .state('ManageEmployee', {
            url: '/ManageEmployee/:Id',
            templateUrl: 'Views/HR/ManageEmployee.html',
            controller: 'ManageEmployeeController'
        })
        .state('EditEmployeeMaster', {
            url: '/EditEmployeeMaster/:Id',
            templateUrl: 'Views/HR/EmployeeMaster.html',
            controller: 'ManageEmployeeController'
        })

        .state('ManageEmployee1', {
            url: '/ManageEmployee1/:Id',
            templateUrl: 'Views/HR/ManageEmployee.html',
            controller: 'ManageEmployeeController'
        })
        .state('EmployeeMasterList', {
            url: '/EmployeeMasterList/:Id',
            templateUrl: 'Views/HR/ManageEmployee.html',
            controller: 'ManageEmployeeController',
        })
        .state('EmployeeDetailsUpload', {
            url: '/EmployeeDetailsUpload',
            templateUrl: 'Views/HR/EmployeeDetailsUpload.html',
            controller: 'EmployeeDetailsUploadController'
        })

        .state('EmployeeRelieve', {
            url: '/EmployeeRelieve',
            templateUrl: 'Views/HR/EmployeeRelieve.html',
            controller: 'EmployeeRelieveController'
        })

        //Student
        .state('ManageStudent', {
            url: '/ManageStudent/:Id',
            templateUrl: 'Views/Student/ManageStudent.html',
            controller: 'StudentMasterController'
        })
        .state('StudentDetails', {
            url: '/StudentDetails',
            templateUrl: 'Views/Student/StudentDetailsAdd.html',
            controller: 'StudentMasterController'
        })
        .state('StudentDetailsView', {
            url: '/StudentDetailsView/:Id',
            templateUrl: 'Views/Student/StudentDetailsView.html',
            controller: 'StudentMasterController'
        })
        .state('EditStudentDetails', {
            url: '/EditStudentDetails/:Id',
            templateUrl: 'Views/Student/StudentDetailsAdd.html',
            controller: 'StudentMasterController'
        })
        .state('StudentResult', {
            url: '/StudentResult',
            templateUrl: 'Views/Student/StudentResult.html',
            controller: 'StudentResultController'
        })


        //TimeTable
        .state('ExamTimetable', {
            url: '/ExamTimetable',
            templateUrl: 'Views/Time Table/ExamTimetableadd.html',
            controller: 'ExamTimeTableController'
        })

        .state('ExamTimeTableView', {
            url: '/ExamTimeTableView/:Id',
            templateUrl: 'Views/Time Table/ExamTimeTableView.html',
            controller: 'ExamTimeTableController'
        })

        .state('EditExamTimeTable', {
            url: '/EditExamTimeTable/:Id',
            templateUrl: 'Views/Time Table/ExamTimetableadd.html',
            controller: 'ExamTimeTableController'
        })

        .state('ExamTimeTableList', {
            url: '/ExamTimeTableList',
            templateUrl: 'Views/Time Table/ExamTimeTable.html',
            controller: 'ExamTimeTableController'
        })
       
        .state('AnswerBook', {
            url: '/AnswerBook',
            templateUrl: 'Views/Exam/AnswerBook.html',
            controller: 'AnswerBookController'
        })
        //Exams
        .state('QuestionBankList', {
            url: '/QuestionBankList',
            templateUrl: 'Views/Exam/QuestionBank.html',
            controller: 'QuestionBankController'
        })
        .state('QuestionBankListHindi', {
            url: '/QuestionBankListHindi',
            templateUrl: 'Views/Exam/QuestionBankHindi.html',
            controller: 'QuestionBankController'
        })

        .state('PaperPattern', {
            url: '/PaperPattern',
            templateUrl: 'Views/Exam/PaperPattern.html',
            controller: 'PaperPatternController'
        })
        .state('QuestionPaperList', {
            url: '/QuestionPaperList/:view',
            templateUrl: 'Views/Exam/GenerateQuetionPaper.html',
            controller: 'GenerateQuestionPaperController'
        })
        // .state('PrintHallTicket', {
        //     url: '/PrintHallTicket/:Id',
        //     templateUrl: 'Views/Exam/HallTicketPrinting.html',
        //     controller: 'GenerateHallTicketController'
        // })
        // Studenttimetable
        .state('PrintHallTicket', {
            url: '/PrintHallTicket/:Id',
            templateUrl: 'Views/Exam/HallTicketPrinting.html',
            controller: 'PrintHallTicketController'
        })
        .state('GenerateHallTicket', {
            url: '/GenerateHallTicket',
            templateUrl: 'Views/Exam/GenerateHallTicket.html',
            controller: 'GenerateHallTicketController'
        })
        
        .state('ExaminationMarks', {
            url: '/ExaminationMarks/:view',
            templateUrl: 'Views/Exam/ExaminationMarks.html',
            controller: 'ExaminationMarksController'
        })
        .state('ExaminationMarksReport', {
            url: '/ExaminationMarksReport',
            templateUrl: 'Views/Exam/ExaminationMarksReport.html',
            controller: 'ExaminationMarksReportController'
        })
        // .state('ExaminationMarks', {
        //     url: '/ExaminationMarks',
        //     templateUrl: 'Views/Exam/ExaminationMarks.html',
        //     controller: 'ExaminationMarksController'
        // })
        // .state('ExamwiseMarkEntry', {
        //     url: '/ExamwiseMarkEntry/:view',
        //     templateUrl: 'Views/Exam/ExaminationMarks.html',
        //     controller: 'ExaminationMarksController'
        // })
        .state('ExaminationResult', {
            url: '/ExaminationResult',
            templateUrl: 'Views/Exam/ExaminationResult.html',
            controller: 'ExaminationResultController'
        })

        //other pages

        .state('academicyear', {
            url: '/Academic',
            templateUrl: 'Views/Settings/Organiser/AcademicYear.html',
            controller: 'AcademicYearMasterController'
        })
        .state('EmployeeMaster', {
            url: '/EmployeeMaster',
            templateUrl: 'Views/HR/EmployeeMaster.html',
            controller: 'ManageEmployeeController'
        })
        .state('EmployeeMasterView', {
            url: '/EmployeeMasterView/:Id',
            templateUrl: 'Views/HR/EmployeeMasterView.html',
            controller: 'ManageEmployeeController',
        })
        .state('Promotion', {
            url: '/Promotion',
            templateUrl: 'Views/Exam/Promotion.html',
            controller: 'PromotionController'
        })
        .state('AcademicYear', {
            url: '/AcademicYear',
            templateUrl: 'Views/Administration/AcademicYear.html',
            controller: 'AcademicYearMasterController'
        })
        .state('PaperEvaluation', {
            url: '/PaperEvaluation',
            templateUrl: 'Views/Exam/PaperEvaluation.html',
            controller: 'PaperEvaluationController'
        })   
        .state('PaperEvaluationedit', {
            url: '/PaperEvaluation/:Id',
            templateUrl: 'Views/Exam/PaperEvaluation.html',
            controller: 'PaperEvaluationController'
        })      
        .state('PaperEvaluation_List', {
            url: '/PaperEvaluationView',
            templateUrl: 'Views/Exam/EvaluationList.html',
            controller: 'EvaluationController'
        })
        .state('PreviewHallTicket', {
            url: '/PreviewHallTicket/:Id',
            templateUrl: 'Views/Exam/admitcard.html',
            controller: 'PrintHallTicketController'
        })
        .state('AssignExamCenter', {
            url: '/AssignExamCenter',
            templateUrl: 'Views/Exam/AssignExamCenter.html',
            controller: 'ExamcenterAllocationController'
        })
        .state('InstitutionMaster', {
            url: '/InstitutionMaster',
            templateUrl: 'Views/Administration/InstitutionMaster.html',
            controller: 'InstitutionMasterController'
        })
        .state('PreviewMarksheet', {
            url: '/PreviewMarksheet/:StudentId',
            templateUrl: 'Views/Exam/Marksheetprint.html',
            controller: 'MarksheetPrintController'
        })
        
        .state('Marksheet', {
            url: '/Marksheet',
            templateUrl: 'Views/Exam/Marksheet.html',
            controller: 'MarksheetPrintController'
        })
        .state('AnswerBookQrCode', {
            url: '/AnswerBookQrCode',
            templateUrl: 'Views/Exam/AnswerBookQrCode.html',
            controller: 'AnswerBookQrCodeController'
        })
        .state('ABScanUpload', {
            url: '/ABScanUpload',
            templateUrl: 'Views/Exam/ABScanUpload.html',
            controller: 'ScanandUploadController'
        })  
        .state('StudentReport', {
            url: '/StudentReport',
            templateUrl: 'Views/Reports/StudentReports.html',
            controller: 'StudentReportsController'
        })
        .state('ExamAttendanceReport', {
            url: '/ExamAttendanceReport',
            templateUrl: 'Views/Reports/ExamAttendanceReport.html',
            controller: 'ExamAttendanceReportController'
        })
        .state('Dashboard', {
            url: '/subject_evaluator_reports',
            templateUrl: 'Views/Exam/subjectEvaluatorsReport.html',
            controller: 'EvaluationController'
    
        })
        .state('EvaluationDetails', {
            url: '/EvaluationDetails',
            templateUrl: 'Views/Reports/EvaluationDetails.html',
            controller: 'DashboardController'
        })
        .state('AttendanceDetailsReport', {
            url: '/AttendanceDetailsReport',
            templateUrl: 'Views/Reports/AttendanceDetails.html',
            controller: 'AttendanceDetailsReportController'
        })
        .state('EvaluationMarkDetailsReport', {
            url: '/EvaluationMarkDetailsReport',
            templateUrl: 'Views/Reports/EvaluationMarkDetailsReport.html',
            controller: 'EvaluationMarkDetailReportController'
        })
         .state('DashboardAttendanceReport', {
            url: '/DashboardAttendanceReport',
            templateUrl: 'Views/Reports/dashboard.html',
            controller: 'DashboardController'
        })
        .state('Examwiseattendance', {
            url: '/Examwiseattendance',
            templateUrl: 'Views/Reports/Examcenterwiseattendance.html',
            controller: 'DashboardController'
        })
        .state('Evaluation', {
            url: '/Evaluation',
            templateUrl: 'Views/Reports/Evaluation.html',
            controller: 'DashboardController'
        })
          .state('ChangePassword', {
            url: '/ChangePassword',
            templateUrl: 'Views/Administration/ChangePassword.html',
            controller: 'LoginController'
        })
        .state('ResetPassword', {
            url: '/ResetPassword',
            templateUrl: 'Views/Administration/ResetPassword.html',
            controller: 'LoginController'
        }) 
        .state('QuestionPaperUpload', {
            url: '/QuestionPaperUpload',
            templateUrl: 'Views/Exam/QuestionPaperUpload.html',
            controller: 'QuestionPaperUploadController'
        })    
        .state('ExaminationMarksList', {
            url: '/ExaminationMarksList',
            templateUrl: 'Views/Exam/ExamMarkSubmit.html',
            controller: 'ExaminationMarksSubmitController'
        })
        .state('EvaluationSubjectEvaluatorreport', {
            url: '/EvaluationSubjectEvaluatorreport',
            templateUrl: 'Views/Reports/subjectEvaluatorsReport.html',
            controller: 'EvaluationController'
        })
        .state('SubjectWiseReport', {
            url: '/SubjectWiseReport',
            templateUrl: 'Views/Reports/subjectWiseReport.html',
            controller: 'SubjectController'
        })
        .state('evaluationsummery', {
            url: '/evaluationsummery',
            templateUrl: 'Views/Reports/EvaluationSummaryReport.html',
            controller: 'DashboardController'
        });
});

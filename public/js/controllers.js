'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('HomeController', function ($scope, $mdSidenav, $mdDialog, $mdBottomSheet, $window, $document) {
    $scope.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };

        $scope.message = '';

        $scope.messageSample = function () {
          $scope.message = 'MSH|^~\&|LCS|LCA|LIS|TEST9999|199807311532||ORU^R01|3629|P|2.2\n' +
                           'PID|2|2161348462|20809880170|1614614|20809880170^TESTPAT||19760924|M|||^^^^00000-0000|||||||86427531^^^03|SSN# HERE\n' +
                           'ORC|NW|8642753100012^LIS|20809880170^LCS||||||19980727000000|||HAVILAND\n' +
                           'OBR|1|8642753100012^LIS|20809880170^LCS|008342^UPPER RESPIRATORYCULTURE^L|||19980727175800||||||SS#634748641 CH14885 SRC:THROASRC:PENI|19980727000000||||||20809880170||19980730041800||BN|F\n' +
                           'OBX|1|ST|008342^UPPER RESPIRATORY CULTURE^L||FINALREPORT|||||N|F||| 19980729160500|BN\n' +
                           'ORC|NW|8642753100013^LIS|20809880171^LDS||||||19980728000000|||HAVILAND2\n' +
                           'OBR|2|8642753100012^LIS|20809880170^LCS|997602^.^L|||19980727175800||||G|||19980727000000||||||20809880170||19980730041800|||F|997602|||008342\n' +
                           'OBX|2|CE|997231^RESULT 1^L||M415|||||N|F|||19980729160500|BN\n' +
                           'NTE|1|L|MORAXELLA (BRANHAMELLA) CATARRHALIS\n' +
                           'NTE|2|L| HEAdVY GROWTH\n' +
                           'NTE|3|L| BETA LACTAMASE POSITIVE\n' +
                           'OBX|3|CE|997232^RESULT 2^L||MR105|||||N|F|||19980729160500|BN\n' +
                           'NTE|1|L|ROUTINE RESPIRATORY FLORA';

          $scope.init();
        };

        $scope.reset = function () {
          document.getElementById('message').value = '';
          $scope.segmentTypes = [];
          var repeatingSegments = [];
          var fieldCount = [];
          $scope.messageType = '';
          $scope.fieldData = [];
          $scope.segmentFields = [];
          $scope.components = [];
          $scope.subcomponents = [];
          $scope.repeaters = [];
          $scope.message = null;
          $scope.init();
        };


        $scope.segmentTypes = [];
        var repeatingSegments = [];
        var fieldCount = [];
        $scope.fieldData = [];
        var MSHFields = ['Field Separators', 'Encoding Characters', 'Sending Application', 'Sending Facility', 'Receiving Application', 'Receiving Facility', 'Date/Time Of Message', 'Security', 'Message Type', 'Message Control ID', 'Processing ID', 'Version ID', 'Sequence Number', 'Continuation Pointer', 'Accept Acknowledgment Type', 'Application Acknowledgment Type', 'Country Code', 'Character Set', 'Principal Language Of Message'];
        var EVNFields = ['Event Type Code',	'Recorded Date/Time',	'Date/Time Planned Event',	'Event Reason Code',	'Operator ID',	'Event Occurred'];
        var PIDFields = ['Set ID',	'Patient ID (External ID)', 'Patient ID (Internal ID)',	'Alternate Patient ID',	'Patient Name',	'Mother’s Maiden Name',	'Date/Time of Birth',	'Sex',	'Patient Alias',	'Race',	'Patient Address',	'Country Code',	'Phone Number – Home',	'Phone Number – Business',	'Primary Language',	'Marital Status',	'Religion',	'Patient Account Number',	'SSN Number',	'Drivers License Number ',	'Mother’s Identifier',	'Ethnic Group',	'Birth Place',	'Multiple Birth Indicator',	'Birth Order',	'Citizenship',	'Veterans Military Status',	'Nationality',	'Patient Death Date and Time',	'Patient Death Indicator'];
        var PV1Fields = ['Set ID', 'Patient Class',	'Assigned Patient Location',	'Admission Type',	'Preadmit Number',	'Prior Patient Location',	'Attending Doctor',	'Referring Doctor',	'Consulting Doctor',	'Hospital Service',	'Temporary Location',	'Preadmit Test Indicator',	'Re-admission Indicator',	'Admit Source',	'Ambulatory Status',	'VIP Indicator',	'Admitting Doctor',	'Patient Type',	'Visit Number',	'Financial Class',	'Charge Price Indicator',	'Courtesy Code',	'Credit Rating',	'Contract Code',	'Contract Effective Date',	'Contract Amount',	'Contract Period',	'Interest Code',	'Transfer to Bad Debt Code',	'Transfer to Bad Debt Date',	'Bad Debt Agency Code',	'Bad Debt Transfer Amount',	'Bad Debt Recovery Amount',	'Delete Account Indicator',	'Delete Account Date',	'Discharge Disposition',	'Discharged to Location',	'Diet Type',	'Servicing Facility',	'Bed Status',	'Account Status',	'Pending Location',	'Prior Temporary Location',	'Admit Date/Time',	'Discharge Date/Time',	'Current Patient Balance',	'Total Charges',	'Total Adjustments',	'Total Payments',	'Alternate Visit ID',	'Visit Indicator',	'Other Healthcare Provider'];
        var PV2Fields = [];
        var PD1Fields = ['Set ID', 'Living Dependency', 'Living Arrangement', 'Patient Primary Facility', 'Patient Primary Care Provider', 'Student Indicator', 'Handicap', 'Living Will', 'Organ Donor', 'Separate Bill', 'Duplicate Patient', 'Publicity Code', 'Protection Indicator'];
        var NK1Fields = ['Set ID', 'Name',	'Relationship',	'Address',	'Home Phone',	'Business Phone',	'Contact Role',	'Started',	'Ended',	'Job Title',	'Name',	'Marital Status',	'Gender',	'Birthdate',	'Living Dependency',	'Ambulatory Status',	'Citizenship',	'Primary Language',	'Student Indicator', 'Religion', 'Nationality',	'Ethnicity', 'Contact Reason', 'Job Status',	'Race',	'Handicap',	'SSN',	'Birth Place',	'VIP Indicator'];
        var DG1Fields = ['Set ID',	'Diagnosis Coding Method',	'Diagnosis Code',	'Diagnosis Description',	'Diagnosis Date/Time',	'Diagnosis Type',	'Major Diagnostic Category',	'Diagnostic Related Group',	'DRG Approval Indicator',	'DRG Grouper Review Code',	'Outlier Type',	'Outlier Days',	'Outlier Cost',	'Grouper Version And Type',	'Diagnosis Priority',	'Diagnosing Clinician',	'Diagnosis Classification',	'Confidential Indicator',	'Attestation Date/Time'];
        var SCHFields = ['Placer Appointment ID', 'Filler Appointment ID', 'Occurrence Number', 'Placer Group Number', 'Schedule ID', 'Event Reason', 'Appointment Reason', 'Appointment Type', 'Appointment Duration', 'Appointment Duration Units', 'Appointment Timing Quantity', 'Placer Contact Person', 'Placer Contact Phone Number', 'Placer Contact Address', 'Placer Contact Location', 'Filler Contact Person', 'Filler Contact Phone Number', 'Filler Contact Address', 'Filler Contact Location', 'Entered by Person', 'Entered by Phone Number', 'Entered by Location', 'Parent Placer Appointment ID', 'Parent Filler Appointment ID', 'Filler Status Code'];
        var GT1Fields = ['Set ID', 'Guarantor Number', 'Guarantor Name', 'Guarantor Spouse Name', 'Guarantor Address', 'Guarantor Ph Num-Home', 'Guarantor Ph Num-Business', 'Guarantor Date/Time Of Birth', 'Guarantor Sex', 'Guarantor Type', 'Guarantor Relationship', 'Guarantor SSN', 'Guarantor Date - Begin', 'Guarantor Date - End', 'Guarantor Priority', 'Guarantor Employer Name', 'Guarantor Employer Address', 'Guarantor Employer Phone Number', 'Guarantor Employee ID Number', 'Guarantor Employment Status', 'Guarantor Organization Name', 'Guarantor Billing Hold Flag', 'Guarantor Credit Rating Code', 'Guarantor Death Date And Time', 'Guarantor Death Flag', 'Guarantor Charge Adjustment Code', 'Guarantor Household Annual Income', 'Guarantor Household Size', 'Guarantor Employer ID Number', 'Guarantor Marital Status Code', 'Guarantor Hire Effective Date', 'Employment Stop Date', 'Living Dependency', 'Ambulatory Status', 'Citizenship', 'Primary Language', 'Living Arrangement', 'Publicity Indicator', 'Protection Indicator', 'Student Indicator', 'Religion', 'Mother\'s Maiden Name', 'Nationality', 'Ethnic Group', 'Contact Person Name', 'Contact Person\'s Telephone Number', 'Contact Reason', 'Contact Relationship', 'Job Title', 'Job Code/Class', 'Guarantor Employer\'s Organization Name', 'Handicap', 'Job Status', 'Guarantor Financial Class', 'Guarantor Race'];
        var IN1Fields = ['Set ID', 'Insurance Plan ID', 'Insurance Company ID', 'Insurance Company Name', 'Insurance Company Address', 'Insurance Co. Contact Person', 'Insurance Co Phone Number', 'Group Number', 'Group Name', 'Insured\'s Group Emp ID', 'Insured\'s Group Emp Name', 'Plan Effective Date', 'Plan Expiration Date', 'Authorization Information', 'Plan Type', 'Name Of Insured', 'Insured\'s Relationship To Patient', 'Insured\'s Date Of Birth', 'Insured\'s Address', 'Assignment Of Benefits', 'Coordination Of Benefits', 'Coord Of Ben. Priority', 'Notice Of Admission Flag', 'Notice Of Admission Date', 'Report Of Eligibility Flag', 'Report Of Eligibility Date', 'Release Information Code', 'Pre-Admit Cert (PAC)', 'Verification Date/Time', 'Verification By', 'Type Of Agreement Code', 'Billing Status', 'Lifetime Reserve Days', 'Delay Before L.R. Day', 'Company Plan Code', 'Policy Number', 'Policy Deductible', 'Policy Limit - Amount', 'Policy Limit - Days', 'Room Rate - Semi-Private', 'Room Rate - Private', 'Insured\'s Employment Status', 'Insured\'s Sex', 'Insured\'s Employer Address', 'Verification Status', 'Prior Insurance Plan ID', 'Coverage Type', 'Handicap', 'Insured\'s ID Number'];
        var IN2Fields = [];
        var NTEFields = ['Set ID', 'Source of Comment', 'Comment'];
        var OBRFields = ['Set ID', 'Placer Order Number', 'Filler Order Number', 'Universal Service ID', 'Priority', 'Requested Date/time', 'Observation Date/Time', 'Observation End Date/Time', 'Collection Volume', 'Collector Identifier', 'Specimen Action Code', 'Danger Code', 'Relevant Clinical Info', 'Specimen Received Date/Time', 'Specimen Source', 'Ordering Provider', 'Order Callback Phone Number', 'Placer field 1', 'Placer field 2', 'Filler Field 1', 'Filler Field 2', 'Results Rpt/Status Chng - Date/Time', 'Charge to Practice', 'Diagnostic Serv Sect ID', 'Result Status', 'Parent Result', 'Quantity/Timing', 'Result Copies To', 'Parent', 'Transportation Mode', 'Reason for Study', 'Principal Result Interpreter', 'Assistant Result Interpreter', 'Technician', 'Transcriptionist', 'Scheduled Date/Time', 'Number of Sample Containers', 'Transport Logistics of Collected Sample', 'Collector\'s Comment', 'Transport Arrangement Responsibility', 'Transport Arranged', 'Escort Required', 'Planned Patient Transport Comment'];
        var OBXFields = ['Set ID', 'Value Type', 'Observation Identifier', 'Observation Sub-ID', 'Observation Value', 'Units', 'References Range', 'Abnormal Flags', 'Probability', 'Nature of Abnormal Test', 'Observ Result Status', 'Date Last Obs Normal Values', 'User Defined Access Checks', 'Date/Time of the Observation', 'Producer\'s ID', 'Responsible Observer', 'Observation Method'];
        var ORCFields = ['Order Control', 'Placer Order Number', 'Filler Order Number', 'Placer Group Number', 'Order Status', 'Response Flag', 'Quantity/Timing', 'Parent', 'Date/Time of Transaction', 'Entered By', 'Verified By', 'Ordering Provider', 'Enterer\'s Location', 'Call Back Phone Number', 'Order Effective Date/Time', 'Order Control Code Reason', 'Entering Organization', 'Entering Device', 'Action By'];
        var FT1Fields = ['Set ID', 'Transaction ID', 'Transaction Batch ID', 'Transaction Date', 'Transaction Posting Date', 'Transaction Type', 'Transaction Code', 'Transaction Description', 'Transaction Description - Alt', 'Transaction Quantity', 'Transaction Amount - Extended', 'Transaction Amount - Unit', 'Department Code', 'Insurance Plan ID', 'Insurance Amount', 'Assigned Patient Location', 'Fee Schedule', 'Patient Type', 'Diagnosis Code', 'Performed By Code', 'Ordered By Code', 'Unit Cost', 'Filler Order Number', 'Entered By Code', 'Procedure Code'];
        var TXAFields = ['Set ID', 'Document Type', 'Document Content Presentation', 'Activity Date/Time', 'Primary Activity Provider Code/Name', 'Origination Date/Time', 'Transcription Date/Time', 'Edit Date/Time', 'Originator Code/Name', 'Assigned Document Authenticator', 'Transcriptionist Code/Name', 'Unique Document Number', 'Parent Document Number', 'Placer Order Number', 'Filler Order Number', 'Unique Document File Name', 'Document Completion Status', 'Document Confidentiality Status', 'Document Availability Status', 'Document Storage Status', 'Document Change Reason', '"Authentication Person', ' Time Stamp"', 'Distributed Copies (Code and Name of Recipients)'];
        var AL1Fields = [];
        var DRGFields = [];
        var ACCFields = [];
        var UB2Fields = [];
        var PR1Fields = [];
        var MRGFields = [];



        var Fields = [];


        $scope.init = function () {
          $scope.segmentTypes = [];
          var fieldCount = [];
          $scope.messageType = '';
          $scope.fieldData = [];
          $scope.segmentFields = [];
          $scope.components = [];
          $scope.subcomponents = [];
          $scope.repeaters = [];
            // Array of segment names in message
            var segmentCount = $scope.message.split('\n').length;
            for (var c = 0; c<segmentCount; c++) {
              $scope.segmentTypes[c] = {
                segmentName: $scope.message.split('\n')[c].substr(0,3),
                segmentId: $scope.message.split('\n')[c].split('|')[0] + c
              };
            }

            // Check for repeating segments
            function getRepeatingSegments(arr) {
              var a = [], b = [], repeatingElements = [], prev;

              arr.sort();
              for ( var i = 0; i < arr.length; i++ ) {
                  if ( arr[i] !== prev ) {
                      a.push(arr[i]);
                      b.push(1);
                  } else {
                      b[b.length-1]++;
                  }
                  prev = arr[i];
              }

              for (var j=0; j<a.length; j++) {
                  if (b[j] > 1) {
                  	repeatingElements.push(a[j]);
                  }
              }
              return repeatingElements;
          }

          var segmentList = [];
          for (var d=0; d<$scope.segmentTypes.length; d++) {
             segmentList.push($scope.segmentTypes[d].segmentName);
          }
          repeatingSegments = getRepeatingSegments(segmentList);


            //loop through arrays and populate fieldData object with the field data
            for (var q=0; q<$scope.segmentTypes.length; q++) {
              fieldCount = $scope.message.split('\n')[q].split('|').length;
              for (var m=0; m<fieldCount; m++) {
                if ($scope.message.split('\n')[q].split('|')[0] === 'MSH') {
                  $scope.fieldData.push({
                    segment: $scope.message.split('\n')[q].split('|')[0],
                    fieldNum: m+2,
                    fieldDescription: eval($scope.message.split('\n')[q].split('|')[0]+'Fields[m+1]'),
                    fieldContents: $scope.message.split('\n')[q].split('|')[(m+1)]
                  });
                } else if (repeatingSegments.indexOf($scope.message.split('\n')[q].split('|')[0]) > -1) {
                  $scope.fieldData.push({
                    segment: $scope.message.split('\n')[q].split('|')[0],
                    segmentId: $scope.message.split('\n')[q].split('|')[0] + q,
                    fieldNum: m+1,
                    fieldDescription: eval($scope.message.split('\n')[q].split('|')[0]+'Fields[m]'),
                    fieldContents: $scope.message.split('\n')[q].split('|')[(m+1)]
                  });
                } else {
                  $scope.fieldData.push({
                    segment: $scope.message.split('\n')[q].split('|')[0],
                    fieldNum: m+1,
                    fieldDescription: eval($scope.message.split('\n')[q].split('|')[0]+'Fields[m]'),
                    fieldContents: $scope.message.split('\n')[q].split('|')[(m+1)]
                  });
                }
              }
            }

            $scope.fieldData.unshift({
              segment: 'MSH',
              fieldNum: 1,
              fieldDescription: MSHFields[0],
              fieldContents: '|'
            });
            // Retrieve message type from fieldData
            for(var w=0; w<$scope.fieldData.length; w++) {
              if ($scope.fieldData[w].segment === 'MSH' && $scope.fieldData[w].fieldNum === 9) {
                $scope.messageType = $scope.fieldData[w].fieldContents;
              }
            }
          };

        $scope.getSegmentData = function (segment, segmentId) {
          //console.log('Function Params: ', segmentId);
          // Create array of segment fields
          $scope.segmentFields = [];
          $scope.components = [];
          $scope.subcomponents = [];
          $scope.repeaters = [];
          //console.log('Repeating Segments Object: ', repeatingSegments);
          if (repeatingSegments.indexOf(segment) > -1) {
            //display the proper instance of the segment
            for (var c=0; c<$scope.fieldData.length; c++) {
              if ($scope.fieldData[c].segment == segment && $scope.fieldData[c].fieldContents !== '' && $scope.fieldData[c].segmentId === segmentId) {
                $scope.segmentFields.push($scope.fieldData[c]);
              }
            }
          } else {
            for (var r=0; r<$scope.fieldData.length; r++) {
              if ($scope.fieldData[r].segment == segment && $scope.fieldData[r].fieldContents !== '') {
                $scope.segmentFields.push($scope.fieldData[r]);
              }
            }
          }
        };

        $scope.getFieldData = function (segment, field) {
          $scope.components = [];
          $scope.subcomponents = [];
          $scope.repeaters = [];
          for (var t=0; t<$scope.segmentFields.length; t++) {
            if ($scope.segmentFields[t].segment === segment && $scope.segmentFields[t].fieldNum === field) {
              for (var w=0; w<$scope.segmentFields[t].fieldContents.split('^').length; w++) {
                $scope.components.push(
                  {
                    fieldNum: $scope.segmentFields[t].fieldNum,
                    componentNum: w + 1,
                    componentDescription: 'Something' + w,
                    componentContents: $scope.segmentFields[t].fieldContents.split('^')[w]
                  });
              }
            }
          }

          for (var u=0; u<$scope.components.length; u++) {
            if ($scope.components[u].componentContents.indexOf('&') > -1) {
              for (var x=0; x<$scope.components[u].componentContents.split('&').length; x++) {
                $scope.subcomponents.push(
                  {
                    fieldNum: $scope.segmentFields[u].fieldNum,
                    subcomponentNum: x + 1,
                    subcomponentDescription: 'Something' + x,
                    subcomponentContents: $scope.components[u].componentContents.split('&')[x]
                  });
              }
            }
          }

          for (var v=0; v<$scope.segmentFields.length; v++) {
            if ($scope.segmentFields[v].segment === segment && $scope.segmentFields[v].fieldNum === field) {
              for (var y=0; y<$scope.segmentFields[v].fieldContents.split('~').length; y++) {
                $scope.repeaters.push(
                  {
                    fieldNum: $scope.segmentFields[v].fieldNum,
                    repeatNum: y + 1,
                    repeatDescription: 'Something' + y,
                    repeaterContents: $scope.segmentFields[v].fieldContents.split('~')[y]
                  });
              }
            }
          }
        };

        $scope.alert = '';
        $scope.showListBottomSheet = function($event) {
          $scope.alert = '';
          $mdBottomSheet.show({
            templateUrl: './partials/bottomSheet.jade',
            controller: 'HomeController',
            targetEvent: $event
          }).then(function(clickedItem) {
            $scope.alert = clickedItem.name + ' clicked!';
          });
        };

        $scope.showAdd = function(ev) {
          $mdDialog.show({
            controller: 'HomeController',
            template: '<md-dialog aria-label="User Form"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
            targetEvent: ev,
          })
          .then(function(answer) {
            $scope.alert = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.alert = 'You cancelled the dialog.';
          });
        };
  });

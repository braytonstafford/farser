'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('HomeController', function ($scope, $mdSidenav, $mdDialog, $mdBottomSheet, $window, $document, $http, $q) {
    $scope.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };

        $scope.message = '';

        $scope.messageSample = function () {
          $scope.message =  'MSH|^~\&|ADT1|MCM|LABADT|MCM|198808181126|SECURITY|ADT^A04|MSG00001|P|2.4\n' +
                            'EVN|A01-|198808181123\n' +
                            'PID|||PATID1234^5^M11||JONES^WILLIAM^A^III||19610615|M-||2106-3|1200 N ELM STREET^^GREENSBORO^NC^27401-1020|GL|(919)379-1212|(919)271-3434~(919)277-3114||S||PATID12345001^2^M10|123456789|9-87654^NC\n' +
                            'NK1|1|JONES^BARBARA^K|SPO|||||20011105\n' +
                            'NK1|1|JONES^MICHAEL^A|FTH\n' +
                            'PV1|1|I|2000^2012^01||||004777^LEBAUER^SIDNEY^J.|||SUR||-||1|A0-\n' +
                            'AL1|1||^PENICILLIN||PRODUCES HIVES~RASH\n' +
                            'AL1|2||^CAT DANDER\n' +
                            'DG1|001|I9|1550|MAL NEO LIVER, PRIMARY|19880501103005|F||\n' +
                            'PR1|2234|M11|111^CODE151|COMMON PROCEDURES|198809081123\n' +
                            'ROL|45^RECORDER^ROLE MASTER LIST|AD|CP|KATE^SMITH^ELLEN|199505011201\n' +
                            'GT1|1122|1519|BILL^GATES^A\n' +
                            'IN1|001|A357|1234|BCMD|||||132987\n' +
                            'IN2|ID1551001|SSN12345678\n' +
                            'ROL|45^RECORDER^ROLE MASTER LIST|AD|CP|KATE^ELLEN|199505011201\n';

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

          // function for getting the field descriptiions
          var assembleFieldData = function (segment, fieldContents, fieldNum, segmentNum) {

            // get segment and field info for getting field descriptions
            var segmentInfo = {
              messageVersion: $scope.message.split('\n')[0].split('|')[11],
              messageType: $scope.message.split('\n')[0].split('|')[8],
              segment: segment,
              fieldIndex: fieldNum
            };
            // console.log('segmentInfo: ', segmentInfo);
            $http.get('/api/segment', { params: segmentInfo }).then(function(fieldDesc) {
              // console.log('Description: ', fieldDesc.data);

              if (segment === 'MSH') {

                var mshSegment = {
                  segment: segment,
                  fieldNum: fieldNum+1,
                  fieldDescription: fieldDesc.data.fieldDescription,
                  fieldContents: fieldContents
                };

                //if ()

                $scope.fieldData.push(mshSegment);
                // console.log('MSH FieldData: ', $scope.fieldData);
              } else if (repeatingSegments.indexOf(segment) > -1) {

                  var repeatingSegment = {
                    segment: segment,
                    segmentId: segment + segmentNum,
                    fieldNum: fieldNum+1,
                    fieldDescription: fieldDesc.data.fieldDescription,
                    fieldContents: fieldContents
                  };

                  $scope.fieldData.push(repeatingSegment);

              } else {

                  var regularSegment = {
                    segment: segment,
                    fieldNum: fieldNum+1,
                    fieldDescription: fieldDesc.data.fieldDescription,
                    fieldContents: fieldContents
                  };

                  $scope.fieldData.push(regularSegment);
              }
            }, function(err) {
              console.log('ya done goofed', err);
            });
          };

          //loop through arrays and populate fieldData object with the assembleFieldData function
          var segment = '';
          var fieldContents = [];
          var fieldNum = '';
          var segmentNum = '';

          for (var q=0; q<$scope.segmentTypes.length; q++) {
            fieldCount = $scope.message.split('\n')[q].split('|').length;
            for (var m=0; m<fieldCount; m++) {

                // declare some variables
                segment = $scope.message.split('\n')[q].split('|')[0];
                fieldNum = m;
                segmentNum = q;

                if (segment === 'MSH') {
                  if (m === 0) {
                    fieldContents = '|';
                  } else {
                     fieldContents = $scope.message.split('\n')[q].split('|')[(m)];
                  }
                } else {
                  fieldContents = $scope.message.split('\n')[q].split('|')[(m+1)];
                }

                assembleFieldData(segment, fieldContents, fieldNum, segmentNum);

            }
          }

          // for(var w=0; w<$scope.fieldData.length; w++) {
          //   if ($scope.fieldData[w].segment == 'MSH' && $scope.fieldData[w].fieldNum == 10) {
          //     $scope.messageType = $scope.fieldData[w].fieldContents;
          //   }
          // }
          // // Retrieve message version from fieldData
          // for(var x=0; x<$scope.fieldData.length; x++) {
          //   if ($scope.fieldData[x].segment == 'MSH' && $scope.fieldData[x].fieldNum == 13) {
          //     $scope.messageVersion = $scope.fieldData[x].fieldContents;
          //   }
          // }
          $scope.messageVersion = $scope.message.split('\n')[0].split('|')[11];
          $scope.messageType = $scope.message.split('\n')[0].split('|')[8];
          console.log('messageType: ', $scope.messageType);
          console.log('messageVersion: ', $scope.messageVersion);
        // close the init function
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

        var getComponentDescription = function (segmentInfo, fieldNum, w, componentContents, t) {
          $http.get('/api/segment', {params: segmentInfo}).then(function (fieldData) {
            console.log('fieldData: ', fieldData);
            if (fieldData) {
              var componentObject = {
                fieldNum: fieldNum,
                componentNum: w + 1,
                dataType: fieldData.data.fieldDataType,
                componentContents: componentContents,
                messageVersion: $scope.message.split('\n')[0].split('|')[11]
              };
              return $http.get('/api/component', {params: componentObject});
            } else {
              return $q.reject();
            }
          }).
          then(function (result) {
            console.log('field data: ', result);
            //console.log('componentDescription: ', componentDescription.data);

            var componentObject = {
              fieldNum: $scope.segmentFields[t].fieldNum,
              componentNum: w + 1,
              componentDescription: result.data,
              componentContents: $scope.segmentFields[t].fieldContents.split('^')[w],
              messageVersion: $scope.message.split('\n')[0].split('|')[11]
            };

            $scope.components.push(componentObject);
          }).
          catch(function (err) {
            console.log('Failure Jim: ', err);
            return { data: 'Failure Jim' };
          });
        };


        $scope.getFieldData = function (segment, field) {
          $scope.components = [];
          $scope.subcomponents = [];
          $scope.repeaters = [];
          for (var t=0; t<$scope.segmentFields.length; t++) {
            if ($scope.segmentFields[t].segment === segment && $scope.segmentFields[t].fieldNum === field) {
              for (var w=0; w<$scope.segmentFields[t].fieldContents.split('^').length; w++) {
                // get segment and field info for getting field descriptions
                var segmentInfo = {
                  messageVersion: $scope.message.split('\n')[0].split('|')[11],
                  messageType: $scope.message.split('\n')[0].split('|')[8],
                  segment: segment,
                  fieldIndex: $scope.segmentFields[t].fieldNum
                };

                getComponentDescription(segmentInfo, $scope.segmentFields[t].fieldNum, w, $scope.segmentFields[t].fieldContents.split('^')[w], t);
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
            templateUrl: './partials/bottomSheet.pug',
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

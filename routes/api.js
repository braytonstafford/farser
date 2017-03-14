/*
 * Serve JSON to our AngularJS client
 */

var HL7Dictionary = require('hl7-dictionary');

// exports.name = function (req, res) {
//   res.json({
//   	name: 'Bob'
//   });
// };

exports.getSegmentData = function (req, res) {

  // get the messageVersion, messageType, and segment
  var messageVersion = req.query.messageVersion;
  var messageType = req.query.messageType;
  var segment = req.query.segment;
  var fieldIndex = req.query.fieldIndex;
  // var messageVersion = '2.3.1';
  // var messageType = 'ADT';
  // var segment = 'PV1';
  // var fieldIndex = 43;

  //console.log('params: ', req.query);
  // console.log('messageVersion: ', messageVersion);
  // console.log('messageType: ', messageType);
  // console.log('segment: ', segment);
  // console.log('fieldIndex: ', fieldIndex);
  // console.log(HL7Dictionary.definitions['2.3'].segments['MSH'].fields[11].desc);

  if (fieldIndex !== undefined && fieldIndex !== null && fieldIndex !== '') {
    var fieldDescription = HL7Dictionary.definitions[messageVersion].segments[segment].fields[fieldIndex].desc;
    var fieldDataType = HL7Dictionary.definitions[messageVersion].segments[segment].fields[fieldIndex].datatype;
    // var fieldDescription = [];
    // for (var i=0;i<HL7Dictionary.definitions[messageVersion].segments[segment].fields.length;i++) {
    //   fieldDescription.push(HL7Dictionary.definitions[messageVersion].segments[segment].fields[i].desc);
    // }

    res.json({
      fieldDescription,
      fieldDataType
    });
  } else {
    res.json('You got nothing');
  }
};



exports.getFieldData = function (req, res) {
  // var messageVersion = req.query.messageVersion;
  // var messageType = req.query.messageType;
  // var segment = req.query.segment;
  // var fieldIndex = req.query.fieldIndex;
  //
  // if (fieldIndex !== undefined && fieldIndex !== null && fieldIndex !== '') {
  //   var componentDescription = HL7Dictionary.definitions[messageVersion].segments[segment].fields[fieldIndex].desc;
  //   res.json(componentDescription);
  // } else {
  //   res.json('You got nothing');
  // }
  res.json('success');
};



exports.getComponentData = function (req, res) {
  var messageVersion = req.query.messageVersion;
  var dataType = req.query.dataType;
  console.log('query: ', req.query);

  if (dataType !== undefined && dataType !== null && dataType !== '') {
    var componentDescription = HL7Dictionary.definitions[messageVersion].fields[dataType].desc;
    res.json(componentDescription);
  } else {
    res.json('You got nothing');
  }
};

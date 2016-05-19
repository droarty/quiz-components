// Use mapRequest to match a response to a request.   The key benefit
// to using this is that it will generate an exact match to the requesting
// url that includes the data parameters into the query string.
// The request should be copied directly from your ajax request
// with parameters: url, type, data and success
// The success parameter should be modified to contain the
// desired json response object.
//
//     let activitiesRequest = {
//       url: `${Config.apiUrl}/activities/activities`,
//       type: 'GET',
//       data: {projects_project_id: project_id, include: 'activities_attempts'},
//       success: [{id: 'abc'}]
//     }
//     mapRequest(server, activitiesRequest)
//
// Will produce a matching url like '/activities/activities?projects_project_id=123&include=activities_attempts'

let mapRequest = function(server, request, response = null) {
  let url = request.url
  if (request.type == 'GET' && request.data) {
    url += '?' + window.$.param(request.data)
  }
  if (response) request.success = response
  server.respondWith(
    request.type,
    url,
    [200, {'Content-Type': 'application/json'}, JSON.stringify(request.success)]
  )
}

module.exports = mapRequest

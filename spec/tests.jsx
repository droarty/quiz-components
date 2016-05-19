window.$ = require('node_modules/jquery/dist/jquery.js')
// we use jQuery v 1.11 above to accomodate j-toker.  However sinon respondImmediately does not work with 1.x unless you turn off asynchronous ajax calls per below. https://github.com/sinonjs/sinon/issues/779
window.$.ajaxSetup({async:false})

var context = require.context('./', true, /-test.jsx?$/)
context.keys().forEach(context)

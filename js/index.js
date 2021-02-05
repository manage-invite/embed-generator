'use strict';$(document).ready(function(){function a(){$(".embed-inner").html(""),$(".embed-footer").remove(),$(".embed-thumb").remove()}function b(b){if(a(),b.url?$(".embed-inner").append("<div class=\"embed-title\"><a href=\""+b.url+"\">"+b.title+"</a></div>"):0!==b.title.length&&$(".embed-inner").append("<div class=\"embed-title\">"+b.title+"</div>"),b.description&&$(".embed-inner").append("<div class=\"embed-description\">"+u.makeHtml(b.description)+"</div>"),b.color&&$(".side-colored").css("background-color",b.color),b.author&&b.author.name){var c="<div class=\"embed-author\"><a class=\"embed-author-name\" href=\""+(b.author?b.author.url:null)+"\">"+b.author.name+"</a></div>",d=0<document.getElementsByClassName("embed-title").length;d?$(".embed-title").before(c):$(".embed-inner").append(c)}b.author&&b.author.icon_url&&$(".embed-author-name").before("<img class=\"embed-author-icon\" src=\""+b.author.icon_url+"\" />"),b.thumbnail&&($(".card.embed .card-block").append("<img class=\"embed-thumb\" src=\""+b.thumbnail+"\" />"),$(".embed-thumb").height($(".embed-thumb")[0].naturalHeight)),b.fields&&0<b.fields.length&&$(".embed-inner").append("<div class=\"fields\"></div>"),b.fields&&b.fields.filter(function(a){return a.name&&a.value}).forEach(function(a){$(".embed-inner .fields").append("\n        <div class=\"field "+(a.inline&&"inline")+"\">\n          <div class=\"field-name\">"+a.name+"</div>\n          <div class=\"field-value\">"+u.makeHtml(a.value)+"</div>\n        </div>\n      ")}),b.footer.text&&$(".card.embed").append("<div class=\"embed-footer\"><span>"+b.footer.text+"</span></div>"),$(".json-source").text(JSON.stringify(b)),hljs.highlightBlock($(".json-source")[0])}// run once on startup
function c(a){$(".input-fields").html("");for(var b=function(a){$(".input-fields").append("<div class=\"form-group row\">\n        <div class=\"col-sm-4\">\n          <input class=\"form-control\" id=\"field-"+a+"-name\" type=\"text\" placeholder=\"name\" value=\""+(w.fields[a].name===void 0?"":w.fields[a].name)+"\" />\n        </div>\n        <div class=\"col-sm-4\">\n          <input class=\"form-control\" id=\"field-"+a+"-value\" type=\"text\" placeholder=\"value\" value=\""+(w.fields[a].value===void 0?"":w.fields[a].value)+"\" />\n        </div>\n        <div class=\"col-sm-2\">\n          <div class=\"form-check\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" id=\"field-"+a+"-inline\" type=\"checkbox\" "+(w.fields[a].inline===void 0?"":"checked=\"checked\"")+"> Inline\n            </label>\n          </div>\n        </div>\n        <div class=\"col-sm-2\">\n          <button id=\"field-"+a+"-delete\" class=\"btn btn-danger select\">Delete</button>\n        </div>\n      </div>"),$("#field-"+a+"-name").keyup(function(){e(a,$("#field-"+a+"-name").val())}),$("#field-"+a+"-value").keyup(function(){f(a,$("#field-"+a+"-value").val())}),$("#field-"+a+"-inline").click(function(){g(a,$("#field-"+a+"-inline").is(":checked"))}),$("#field-"+a+"-delete").click(function(b){b.preventDefault(),h(a)})},c=0;c<a;c++)b(c);$(".input-fields").append("<button id=\"add-field\" class=\"btn btn-success select\">Add field</button>"),$("#add-field").click(function(a){a.preventDefault(),i()})}function d(){var a=document.querySelector("#copy-input");a.setAttribute("type","text"),a.setAttribute("value",JSON.stringify(w)),a.select(),document.execCommand("copy"),a.setAttribute("type","hidden"),window.getSelection().removeAllRanges()}function e(a,c){w.fields[a].name=c,b(w)}function f(a,c){w.fields[a].value=c,b(w)}function g(a,c){w.fields[a].inline=c,b(w)}function h(a){w.fields.splice(a,1),b(w),v-=1,c(v)}function i(){w.fields.push({inline:!0}),v+=1,c(v)}function j(a){w.title=a||"",b(w)}function k(a){w.url=a||"",b(w)}function l(a){w.thumbnail=a||!1,b(w)}function m(a){w.description=a||"",b(w)}function n(a){w.color=a||!1,b(w)}function o(a){w.author.name=a||"",b(w)}function p(a){w.author.url=a||"",b(w)}function q(a){w.author.icon_url=a||"",b(w)}function r(a){w.footer.text=a||"",b(w)}// checking helpers
function s(a,b,c){a.addClass("form-control-warning"),a.removeClass("form-control-success"),a.parent().addClass("has-warning"),a.parent().removeClass("has-success"),0===$("#"+b+"-feedback").length&&a.after("<div class=\"form-control-feedback\" id=\""+b+"-feedback\">"+c+"</div>")}function t(a,b){a.removeClass("form-control-warning"),a.addClass("form-control-success"),a.parent().addClass("has-success"),a.parent().removeClass("has-warning"),$("#"+b+"-feedback").remove()}var u=new showdown.Converter,v=1,w={title:"",author:{name:"",url:"",icon_url:""},description:"",url:"",thumbnail:"",color:"",fields:[{}],footer:{text:""}};b(w),c(v),$("#form").submit(function(a){a.preventDefault()}),$("#select-edit").click(function(){document.getElementById("edit-input").style.visibility="visible"}),$("#edit-input").keyup(function(){var a=document.getElementById("edit-input").value;try{w=JSON.parse(a),b(w),v=w.fields?w.fields.length:0,c(v),$("#title").get(0).value=w.title||null,$("#url").get(0).value=w.url||null,$("#icon").get(0).value=w.thumbnail||null,$("#author_icon").get(0).value=(w.author?w.author.icon_url:null)||null,$("#author_name").get(0).value=(w.author?w.author.name:null)||null,$("#author_url").get(0).value=(w.author?w.author.url:null)||null,$("#description").get(0).value=w.description||null,$("#color").get(0).value=w.color||null,$("#footer").get(0).value=w.footer.text||null}catch(a){}}),$("#copy-source").click(function(a){a.preventDefault(),d()}),$("#title").keyup(function(){var a=$("#title"),b=a.val();// update
j(b)}),$("#url").keyup(function(){var a=$("#url"),b=a.val();"http"===b.substr(0,4)||0===b.length||b.startsWith("{")?(t(a,"url"),k(b)):s(a,"url","not a valid url or a valid variable")}),$("#icon").keyup(function(){var a=$("#icon"),b=a.val();"http"===b.substr(0,4)||0===b.length||b.startsWith("{")?(t(a,"icon"),l(b)):s(a,"icon","not a valid url or a valid variable")}),$("#description").keyup(function(){var a=$("#description"),b=a.val();// update
t(a,"description"),m(b)}),$("#color").change(function(){n($("#color").val())}),$("#author_name").keyup(function(){var a=$("#author_name"),b=a.val();// update
t(a,"author_name"),o(b)}),$("#author_url").keyup(function(){var a=$("#author_url"),b=a.val();"http"===b.substr(0,4)||0===b.length||b.startsWith("{")?(t(a,"author_url"),p(b)):s(a,"author_url","not a valid url or a valid variable")}),$("#author_icon").keyup(function(){var a=$("#author_icon"),b=a.val();"http"===b.substr(0,4)||0===b.length||b.startsWith("{")?(t(a,"author_icon"),q(b)):s(a,"author_icon","not a valid url or a valid variable")}),$("#footer").keyup(function(){var a=$("#footer"),b=a.val();// update
t(a,"footer"),r(b)})});
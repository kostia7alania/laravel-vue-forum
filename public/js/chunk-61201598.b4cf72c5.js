(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61201598"],{"5ac0":function(e,t,n){"use strict";var r=n("ab2e"),i=n.n(r);i.a},ab2e:function(e,t,n){},b761:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[e.errors?n("v-alert",{attrs:{type:"error",color:"red",value:!0}},[e._v("\n        Pleasse give category name\n    ")]):e._e(),n("v-form",{on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[n("v-text-field",{attrs:{label:"Category Name",required:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name","string"===typeof t?t.trim():t)},expression:"form.name"}}),n("v-btn",{attrs:{type:"submit",disabled:e.disabled,color:e.editSlug?"pink":"teal"}},[e.loading?n("v-progress-circular",{attrs:{size:20,width:3,color:"purple",indeterminate:""}}):n("v-icon",[e._v(e._s(e.editSlug?"update":"playlist_add"))]),e._v("\n                    "+e._s(e.editSlug?"Update":"Create")+"\n        ")],1),e.editSlug&&!e.loading?n("v-btn",{attrs:{color:"purple"},on:{click:e.cancelEditing}},[n("v-icon",[e._v("cancel")]),e._v("\n            Cancel\n        ")],1):e._e()],1),n("v-card",[n("v-toolbar",{attrs:{color:"indigo",dark:"",dense:""}},[n("v-toolbar-title",[e._v("Categories\n            "),e.category_loading?n("v-progress-circular",{attrs:{size:20,width:3,color:"purple",indeterminate:""}}):e._e()],1)],1),n("v-list",e._l(e.categories,function(t,r){return n("div",{key:t.id},[n("v-list-tile",[n("v-list-tile-action",[n("v-btn",{attrs:{icon:"",small:"",disabled:e.editSlug==t.slug||e.deletingSlug==t.slug||e.loading},on:{click:function(n){return e.edit(t.name,t.slug)}}},[n("v-icon",{attrs:{color:"orange"}},[e._v("edit")])],1)],1),n("v-list-tile-content",[n("v-list-tile-title",{class:e.deletingSlug==t.slug?"deleting-text":""},[e._v("\n                        "+e._s(t.name)+"\n                    ")])],1),n("v-list-tile-action",[n("v-btn",{attrs:{icon:"",small:"",disabled:e.deletingSlug==t.slug},on:{click:function(n){return e.destroy(t.slug,r)}}},[e.deletingSlug==t.slug?n("v-progress-circular",{attrs:{size:20,width:3,color:"purple",indeterminate:""}}):n("v-icon",{attrs:{color:"red"}},[e._v("delete")])],1)],1)],1),n("v-divider")],1)}),0)],1)],1)},i=[],a=(n("96cf"),n("3b8d")),o=(n("7f7f"),n("cebc")),l=n("2f62"),c={name:"Edit-Categories",data:function(){return{loading:!1,form:{name:null},editSlug:null,errors:null,deletingSlug:null}},created:function(){this["category/getCategories"]()},computed:Object(o["a"])({},Object(l["c"])(["login/isAdmin","category/categories","category/loading"]),{disabled:function(){return!this.form.name||this.loading},categories:function(){return this["category/categories"]},category_loading:function(){return this["category/loading"]}}),methods:Object(o["a"])({},Object(l["b"])(["category/getCategories","category/createCategory","category/updateCategory","category/deleteCategory"]),{cancelEditing:function(){this.editSlug=null,this.form.name=null},submit:function(){this.editSlug?this.update():this.create()},update:function(){var e=this;this.loading=!0,this["category/updateCategory"]({slug:this.editSlug,form:this.form}).then(Object(a["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return snack("Имя категории успешно изменено","success"),t.next=3,e["category/getCategories"]();case 3:e.form.name=null,e.editSlug=null;case 5:case"end":return t.stop()}},t)}))).catch(function(e){console.warn(e),snack("Ошибка при обновлении имени категории","error")}).finally(function(){return e.loading=!1})},create:function(){var e=this;this.loading=!0,this["category/createCategory"](this.form).then(function(){e.form.name=null,snack("Категория успешно создана","success")}).catch(function(t){console.warn(t),e.errors=t.response.data.errors,snack("Ошибка при создании категории","error")}).finally(function(){return e.loading=!1})},destroy:function(e,t){var n=this;this.deletingSlug=e,this["category/deleteCategory"](e).then(Object(a["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return snack("Категория успешно удалена","success"),e.next=3,n["category/getCategories"]();case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)}))).catch(function(e){console.warn(e),snack("Ошибка при удалении категории","error")}).finally(function(){return n.deletingSlug=null})},edit:function(e,t){this.form.name=e,this.editSlug=t}})},s=c,u=(n("5ac0"),n("2877")),g=Object(u["a"])(s,r,i,!1,null,null,null);t["default"]=g.exports}}]);
//# sourceMappingURL=chunk-61201598.b4cf72c5.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-445b4931"],{"3a2f":function(t,e,n){"use strict";n("9734");var i=n("4ad4"),o=n("a9ad"),a=n("16b7"),s=n("b848"),r=n("75eb"),l=n("f573"),c=n("f2e7"),d=n("80d2"),u=n("d9bd"),h=n("58df");function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e["a"]=Object(h["a"])(o["a"],a["a"],s["a"],r["a"],l["a"],c["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},debounce:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String,zIndex:{default:null}},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,n=t.content,i=!this.bottom&&!this.left&&!this.top&&!this.right,o=!1!==this.attach?e.offsetLeft:e.left,a=0;return this.top||this.bottom||i?a=o+e.width/2-n.width/2:(this.left||this.right)&&(a=o+(this.right?e.width:-n.width)+(this.right?10:-10)),this.nudgeLeft&&(a-=parseInt(this.nudgeLeft)),this.nudgeRight&&(a+=parseInt(this.nudgeRight)),this.calcXOverflow(a,this.dimensions.content.width)+"px"},calculatedTop:function(){var t=this.dimensions,e=t.activator,n=t.content,i=!1!==this.attach?e.offsetTop:e.top,o=0;return this.top||this.bottom?o=i+(this.bottom?e.height:-n.height)+(this.bottom?10:-10):(this.left||this.right)&&(o=i+e.height/2-n.height/2),this.nudgeTop&&(o-=parseInt(this.nudgeTop)),this.nudgeBottom&&(o+=parseInt(this.nudgeBottom)),this.calcYOverflow(o+this.pageYOffset)+"px"},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(d["e"])(this.maxWidth),minWidth:Object(d["e"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick(function(){t.value&&t.callActivate()})},mounted:function(){"v-slot"===Object(d["p"])(this,"activator",!0)&&Object(u["a"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=i["a"].options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===d["s"].esc&&(t.getActivator(e),t.runDelay("close"))},e}},render:function(t){var e,n=t("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(e={},p(e,this.contentClass,!0),p(e,"menuable__content__active",this.isActive),p(e,"v-tooltip__content--fixed",this.activatorFixed),e),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.showLazyContent(this.getContentSlot()));return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[t("transition",{props:{name:this.computedTransition}},[n]),this.genActivator()])}})},"3a83":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.loading?n("div",{staticClass:"text-xs-center"},[n("v-progress-circular",{attrs:{size:70,width:7,color:"purple",indeterminate:""}})],1):t.question?n("div",[t.editing?n("question-edit",{attrs:{question:t.question}}):n("question-show",{attrs:{question:t.question}})],1):t._e(),t.question?n("v-container",[n("replies"),n("new-reply")],1):t._e()],1)},o=[],a=(n("097d"),n("be94")),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:""}},[n("v-card",[n("v-form",{on:{submit:function(e){return e.preventDefault(),t.update(e)}}},[n("v-text-field",{attrs:{label:"Title",type:"text",required:""},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title","string"===typeof e?e.trim():e)},expression:"form.title"}}),n("markdown-editor",{model:{value:t.form.body,callback:function(e){t.$set(t.form,"body","string"===typeof e?e.trim():e)},expression:"form.body"}}),n("v-card-actions",{staticClass:"text-xs-center d-flex align-center"},[n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[n("v-btn",t._g({attrs:{color:"primary",type:"submit"}},i),[n("v-icon",{attrs:{color:"orange"}},[t._v("save")]),t._v("\n                             Сохранить\n                         ")],1)]}}])},[n("span",[t._v("Сохранить правки")])]),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[n("v-btn",t._g({attrs:{color:"primary",dark:""},on:{click:t.cancel}},i),[n("v-icon",{attrs:{color:"red"}},[t._v("cancel")]),t._v("\n                             Отменить\n                         ")],1)]}}])},[n("span",[t._v("Выйти без сохранения")])])],1)],1)],1)],1)},r=[],l=n("2f62"),c={name:"edit-question",props:["question"],data(){return{form:{title:null,body:null}}},mounted(){this.form=this.question},methods:Object(a["a"])({},Object(l["b"])(["question/questionUpdate"]),{cancel(){EventBus.$emit("cancelEditing")},update(){this["question/questionUpdate"](this.form).then(t=>this.cancel()).catch(t=>console.warn(t))}})},d=c,u=n("2877"),h=n("6544"),p=n.n(h),v=n("8336"),g=n("b0af"),f=n("99d9"),m=n("a523"),b=n("4bd4"),_=n("132d"),y=n("8654"),E=n("3a2f"),k=Object(u["a"])(d,s,r,!1,null,null,null),T=k.exports;p()(k,{VBtn:v["a"],VCard:g["a"],VCardActions:f["a"],VContainer:m["a"],VForm:b["a"],VIcon:_["a"],VTextField:y["a"],VTooltip:E["a"]});var O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",[n("v-container",{attrs:{fluid:""}},[n("v-card-title",[n("div",[n("div",{staticClass:"headline"},[t._v("\n                    "+t._s(t.question.title)+"\n                ")])]),n("v-spacer"),n("v-btn",{attrs:{color:"teal",dark:""}},[t._v(t._s(t.replyCount)+" Комментариев")])],1),n("v-card-text",{domProps:{innerHTML:t._s(t.body)}}),n("user-info",{attrs:{question:t.question}}),t.own?n("v-card-actions",{staticClass:"text-xs-center d-flex align-center"},[n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[n("v-btn",t._g({attrs:{color:"primary"},on:{click:t.edit}},i),[n("v-icon",{attrs:{color:"orange"}},[t._v("edit")]),t._v("\n                            Редактировать\n                        ")],1)]}}],null,!1,2968133587)},[n("span",[t._v("Редактировать тему")])]),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[n("v-btn",t._g({attrs:{color:"primary",dark:""},on:{click:t.destroy}},i),[n("v-icon",{attrs:{color:"red"}},[t._v("delete")]),t._v("\n                            Удалить\n                        ")],1)]}}],null,!1,3360719560)},[n("span",[t._v("Удалить тему")])])],1):t._e()],1)],1)},x=[],C=n("8dba"),w={name:"forum--question-show",components:{"user-info":C["a"]},props:["question"],data(){return{replyCount:this.question.reply_count}},computed:Object(a["a"])({},Object(l["c"])(["login/id"]),{own(){return this["login/id"]==this.question.id},body(){return md.parse(this.question.body)}}),created(){Echo.private("App.User."+this["login/id"]).notification(t=>{this.replyCount++}),EventBus.$on("deleteReply",()=>{this.replyCount--}),Echo.channel("deleteReplyChannel").listen("DeleteReplyEvent",t=>{this.replyCount--})},methods:{destroy(){axios.delete(`/question/${this.question.slug}`).then(t=>{this.$router.push("/forum")}).catch(t=>{console.warn("err",t.response.data)})},edit(){EventBus.$emit("startEditing")}}},I=w,q=n("e99f"),j=n("9910"),V=Object(u["a"])(I,O,x,!1,null,null,null),$=V.exports;p()(V,{VBtn:v["a"],VCard:g["a"],VCardActions:f["a"],VCardText:q["a"],VCardTitle:f["b"],VContainer:m["a"],VIcon:_["a"],VSpacer:j["a"],VTooltip:E["a"]});var R=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-toolbar",{attrs:{color:"cyan",dark:"",dense:""}},[n("v-toolbar-title",[t._v("Комментарии ("+t._s(t.replies_length)+")\n                    "),t.loading?n("v-progress-circular",{attrs:{size:20,width:3,color:"purple",indeterminate:""}}):t._e()],1)],1),t._l(t.GETTER_TOPIC_REPLIES,function(t,e){return n("reply",{key:t.id,attrs:{data:t,index:e}})})],2)},D=[],S=n("1da1"),A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mt-3"},[n("v-card",[n("v-card-title",[n("user-info",{attrs:{question:t.data}}),n("v-spacer"),n("Like",{attrs:{content:t.data}})],1),n("v-divider"),t.editing?n("edit-reply",{attrs:{data:t.data}}):n("v-card-text",{domProps:{innerHTML:t._s(t.reply)}}),n("v-divider"),t.editing?t._e():n("div",[t.own?n("v-card-actions",[n("v-btn",{attrs:{icon:"",small:""},on:{click:t.edit}},[n("v-icon",{attrs:{color:"orange"}},[t._v("edit")])],1),n("v-btn",{attrs:{icon:"",small:""},on:{click:t.destroy}},[n("v-icon",{attrs:{color:"red"}},[t._v("delete")])],1)],1):t._e()],1)],1)],1)},L=[],P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("markdown-editor",{model:{value:t.data.reply,callback:function(e){t.$set(t.data,"reply",e)},expression:"data.reply"}}),n("v-card-actions",[n("v-btn",{attrs:{icon:"",small:""},on:{click:t.update}},[n("v-icon",{attrs:{color:"green"}},[t._v("save")])],1),n("v-btn",{attrs:{icon:"",small:""},on:{click:t.cancel}},[n("v-icon",{attrs:{color:"black"}},[t._v("cancel")])],1)],1)],1)},B=[],F={props:["data"],methods:{update(){axios.patch(`/question/${this.data.question_slug}/reply/${this.data.id}`,{body:this.data.reply}).then(t=>{this.cancel()}).catch(t=>console.warn(t))},cancel(){EventBus.$emit("cancelEditing")}}},z=F,G=Object(u["a"])(z,P,B,!1,null,null,null),H=G.exports;p()(G,{VBtn:v["a"],VCardActions:f["a"],VIcon:_["a"]});var M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-btn",{attrs:{icon:""},on:{click:t.likeIt}},[n("v-icon",{attrs:{color:t.liked?"red":"red lighten-4"}},[t._v("favorite")]),t._v(" "+t._s(t.count)+"\n    ")],1)],1)},N=[],W={props:["content"],data(){return{liked:this.content.liked,count:this.content.like_count}},created(){Echo.channel("likeChannel").listen("LikeEvent",t=>{console.log(t),this.content.id==t.id&&(1==t.type?this.count++:this.count--)})},computed:Object(a["a"])({},Object(l["c"])(["login/loggedIn"])),methods:{likeIt(){this["login/loggedIn"]?(this.liked?this.decr():this.incr(),this.liked=!this.liked):snack("Для выполнения этого действия нужна авторизация!")},incr(){axios.post(`/like/${this.content.id}`).then(t=>this.count++).catch(t=>console.warn(t))},decr(){axios.delete(`/like/${this.content.id}`).then(t=>this.count--).catch(t=>console.warn(t))}}},Q=W,U=Object(u["a"])(Q,M,N,!1,null,null,null),Y=U.exports;p()(U,{VBtn:v["a"],VIcon:_["a"]});var J={name:"reply",props:["data","index"],components:{editReply:H,Like:Y,"user-info":C["a"]},data(){return{editing:!1}},computed:Object(a["a"])({},Object(l["c"])(["login/id","login/loggedIn"]),{own(){return this["login/id"]==this.data.user_id},reply(){return md.parse(this.data.reply)},created_at(){return this.parseDate(this.data.created_at)},updated_at(){return this.parseDate(this.data.updated_at)},show_updated_at(){return new Date(this.data.updated_at)&&"Invalid Date"!=new Date(this.data.updated_at)&&+new Date(this.data.created_at)!=+new Date(this.data.updated_at)}}),created(){this.listen()},methods:{parseDate:t=>"Invalid Date"!=t.toLocaleString()?t.toLocaleString():"",destroy(){EventBus.$emit("deleteReply",this.index)},edit(){this.editing=!0},listen(){EventBus.$on("cancelEditing",()=>{this.editing=!1})}}},X=J,Z=n("ce7e"),K=Object(u["a"])(X,A,L,!1,null,null,null),tt=K.exports;p()(K,{VBtn:v["a"],VCard:g["a"],VCardActions:f["a"],VCardText:q["a"],VCardTitle:f["b"],VDivider:Z["a"],VIcon:_["a"],VSpacer:j["a"]});var et={name:"REPLIES",components:{reply:tt},data(){return{content:null}},mounted(){var t=this;return Object(S["a"])(function*(){t.listen();const e=yield t["reply/getReplies"]();e&&e.stat?snack("Комментарии обновлены!","success"):snack(`Комментарии не получены.\n    ${"object"==typeof e&&e.msg||""}`,"error")})()},computed:Object(a["a"])({},Object(l["c"])(["login/id","reply/GETTER_TOPIC_REPLIES","reply/loading"]),{GETTER_TOPIC_REPLIES(){return this["reply/GETTER_TOPIC_REPLIES"]},loading(){return this["reply/loading"]},replies_length(){return this.GETTER_TOPIC_REPLIES&&this.GETTER_TOPIC_REPLIES.length||0}}),methods:Object(a["a"])({},Object(l["b"])(["reply/getReplies"]),{listen(){EventBus.$on("deleteReply",t=>{axios.delete(`question/${this.question.slug}/reply/${this.content[t].id}`).then(e=>{this.content.splice(t,1)}).catch(t=>console.warn(t))}),Echo.private("App.User."+this["login/id"]).notification(t=>{console.log("NOTIF->",t,t.type),this.content.unshift(t.reply)}),Echo.channel("deleteReplyChannel").listen("DeleteReplyEvent",t=>{console.log("DeleteReplyEvent=>",t);for(let e=0;e<this.content.length;e++)this.content[e].id==t.id&&this.content.splice(e,1)})}})},nt=et,it=n("490a"),ot=n("2a7f"),at=Object(u["a"])(nt,R,D,!1,null,null,null),st=at.exports;p()(at,{VProgressCircular:it["a"],VToolbar:ot["a"],VToolbarTitle:ot["b"]});var rt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mt-4"},[n("markdown-editor",{ref:"mark",model:{value:t.body,callback:function(e){t.body="string"===typeof e?e.trim():e},expression:"body"}}),t.loggedIn?n("v-btn",{attrs:{dark:"",disabled:!t.body.length,color:"green"},on:{click:t.submit}},[n("v-icon",[t._v("reply")]),t._v(" Ответить\n    ")],1):n("v-btn",{attrs:{dark:"",to:"/login",disabled:!t.body.length,color:"green"}},[t._v("Войдите, чтобы оставить комментарий ")])],1)},lt=[],ct={name:"new-Reply",data(){return{body:""}},mounted(){this.$refs.mark.simplemde.codemirror.on("blur",(t,e)=>{console.log("blur=>",this.body),this["reply/SET_TOPIC_DRAFT"](this.body)});const t=this["reply/GETTER_TOPIC_DRAFT"];this.body=t},computed:Object(a["a"])({},Object(l["c"])(["login/loggedIn","reply/GETTER_TOPIC_DRAFT"]),{loggedIn(){return this["login/loggedIn"]}}),methods:Object(a["a"])({},Object(l["d"])(["reply/SET_TOPIC_DRAFT"]),Object(l["b"])(["reply/newReply"]),{submit(){var t=this;return Object(S["a"])(function*(){const e=yield t["reply/newReply"]({body:t.body});return console.log("comm =>",e),"object"!=typeof e?snack("Ошибка при отправке комменатрия","danger"):e.state?(snack("Комменатрий успешно отправлен: "+e.msg,"success"),void(t.body="")):snack("Ошибка при отправке комменатрия: "+e.msg,"danger")})()}})},dt=ct,ut=Object(u["a"])(dt,rt,lt,!1,null,null,null),ht=ut.exports;p()(ut,{VBtn:v["a"],VIcon:_["a"]});var pt={components:{QuestionEdit:T,QuestionShow:$,replies:st,NewReply:ht},data(){return{question:null,editing:null,loading:!1}},created(){this.listen(),this.getQuestion()},computed:Object(a["a"])({},Object(l["c"])(["login/loggedIn"])),methods:{listen(){EventBus.$on("startEditing",()=>{this.editing=!0}),EventBus.$on("cancelEditing",()=>{this.editing=!1})},getQuestion(){this.loading=!0,axios.get(`/question/${this.$route.params.slug}`).then(t=>{this.question=t.data.data}).finally(()=>this.loading=!1)}}},vt=pt,gt=Object(u["a"])(vt,i,o,!1,null,null,null);e["default"]=gt.exports;p()(gt,{VContainer:m["a"],VProgressCircular:it["a"]})},"8dba":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"body-1",attrs:{"grey--text":""}},[n("v-icon",{attrs:{size:"20"}},[t._v("account_circle")]),t._v("\n        "+t._s(t.question.user)+"\n        "),n("v-icon",{attrs:{size:"20"}},[t._v("date_range")]),t._v("\n    "+t._s(t.created_at)+"\n\n    "),t.updated_at?n("v-tooltip",{staticClass:"pl-2",attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[n("span",t._g({},i),[n("v-icon",{attrs:{size:"20"}},[t._v("border_color")])],1)]}}],null,!1,2265665325)},[n("span",[t._v("Обновлен: "+t._s(t.updated_at))])]):t._e()],1)},o=[],a={name:"user-info",props:{question:Object},methods:{toHumanDateTime:t=>{const e=new Date(t);return"Invalid Date"==e?"n/a":`${e.getDate()}.${e.getMonth()+1}.${e.getFullYear()} ${e.getHours()}:${e.getMinutes()}`}},computed:{created_at(){return this.toHumanDateTime(this.question.created_at)},updated_at(){if(!this.question||!this.question.updated_at)return!1;const t=new Date(this.question.updated_at),e=new Date(this.question.created_at);return+e!=+t&&this.toHumanDateTime(t)}}},s=a,r=n("2877"),l=n("6544"),c=n.n(l),d=n("132d"),u=n("3a2f"),h=Object(r["a"])(s,i,o,!1,null,null,null);e["a"]=h.exports;c()(h,{VIcon:d["a"],VTooltip:u["a"]})},9734:function(t,e,n){}}]);
//# sourceMappingURL=chunk-445b4931.e0f44c88.js.map
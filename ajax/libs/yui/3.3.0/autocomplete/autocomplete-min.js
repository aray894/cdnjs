YUI.add("autocomplete-base",function(f){var g=f.Escape,j=f.Lang,q=f.Array,i=f.Object,d=j.isFunction,r=j.isString,u=j.trim,l=f.Attribute.INVALID_VALUE,o="_functionValidator",x="_sourceSuccess",c="allowBrowserAutocomplete",h="inputNode",w="query",e="queryDelimiter",b="requestTemplate",m="results",n="resultListLocator",k="value",s="valueChange",a="clear",t=w,p=m;function v(){f.before(this._bindUIACBase,this,"bindUI");f.before(this._destructorACBase,this,"destructor");f.before(this._syncUIACBase,this,"syncUI");this.publish(a,{defaultFn:this._defClearFn});this.publish(t,{defaultFn:this._defQueryFn});this.publish(p,{defaultFn:this._defResultsFn});}v.ATTRS={allowBrowserAutocomplete:{value:false},allowTrailingDelimiter:{value:false},inputNode:{setter:f.one,writeOnce:"initOnly"},maxResults:{value:0},minQueryLength:{value:1},query:{readOnly:true,value:null},queryDelay:{value:100},queryDelimiter:{value:null},requestTemplate:{setter:"_setRequestTemplate",value:null},resultFilters:{setter:"_setResultFilters",value:[]},resultFormatter:{validator:o},resultHighlighter:{setter:"_setResultHighlighter"},resultListLocator:{setter:"_setLocator"},results:{readOnly:true,value:[]},resultTextLocator:{setter:"_setLocator"},source:{setter:"_setSource"},tokenInput:{readOnly:true},value:{value:""}};v.CSS_PREFIX="ac";v.UI_SRC=(f.Widget&&f.Widget.UI_SRC)||"ui";v.prototype={sendRequest:function(A,B){var y,z=this.get("source");if(A||A===""){this._set(w,A);}else{A=this.get(w);}if(z){if(!B){B=this.get(b);}y=B?B(A):A;z.sendRequest({request:y,callback:{success:f.bind(this._onResponse,this,A)}});}return this;},_bindUIACBase:function(){var z=this.get(h),y=z&&z.tokenInput;if(y){z=y.get(h);this._set("tokenInput",y);}if(!z){f.error("No inputNode specified.");return;}this._inputNode=z;this._acBaseEvents=[z.on(s,this._onInputValueChange,this),z.on("blur",this._onInputBlur,this),this.after(c+"Change",this._syncBrowserAutocomplete),this.after(s,this._afterValueChange)];},_destructorACBase:function(){var y=this._acBaseEvents;while(y&&y.length){y.pop().detach();}},_syncUIACBase:function(){this._syncBrowserAutocomplete();this.set(k,this.get(h).get(k));},_createArraySource:function(z){var y=this;return{sendRequest:function(A){y[x](z.concat(),A);}};},_createFunctionSource:function(z){var y=this;return{sendRequest:function(A){y[x](z(A.request)||[],A);}};},_createObjectSource:function(z){var y=this;return{sendRequest:function(A){var B=A.request;y[x](i.owns(z,B)?z[B]:[],A);}};},_functionValidator:function(y){return y===null||d(y);},_getObjectValue:function(B,A){if(!B){return;}for(var z=0,y=A.length;B&&z<y;z++){B=B[A[z]];}return B;},_parseResponse:function(A,y,P){var G={data:P,query:A,results:[]},I=this.get(n),H=[],F=y&&y.results,C,z,J,B,O,K,L,M,D,E,N;if(F&&I){F=I(F);}if(F&&F.length){C=this.get("resultFilters");N=this.get("resultTextLocator");for(K=0,L=F.length;K<L;++K){D=F[K];E=N?N(D):D.toString();H.push({display:g.html(E),raw:D,text:E});}for(K=0,L=C.length;K<L;++K){H=C[K](A,H.concat());if(!H){return;}if(!H.length){break;}}if(H.length){J=this.get("resultFormatter");O=this.get("resultHighlighter");M=this.get("maxResults");if(M&&M>0&&H.length>M){H.length=M;}if(O){B=O(A,H.concat());if(!B){return;}for(K=0,L=B.length;K<L;++K){D=H[K];D.highlighted=B[K];D.display=D.highlighted;}}if(J){z=J(A,H.concat());if(!z){return;}for(K=0,L=z.length;K<L;++K){H[K].display=z[K];}}}}G.results=H;this.fire(p,G);},_parseValue:function(y){var z=this.get(e);if(z){y=y.split(z);y=y[y.length-1];}return j.trimLeft(y);},_setLocator:function(y){if(this[o](y)){return y;}var z=this;y=y.toString().split(".");return function(A){return A&&z._getObjectValue(A,y);};},_setRequestTemplate:function(y){if(this[o](y)){return y;}y=y.toString();return function(z){return j.sub(y,{query:encodeURIComponent(z)});};},_setResultFilters:function(A){var y,z;if(A===null){return[];}y=f.AutoCompleteFilters;z=function(B){if(d(B)){return B;}if(r(B)&&y&&d(y[B])){return y[B];}return false;};if(j.isArray(A)){A=q.map(A,z);return q.every(A,function(B){return !!B;})?A:l;}else{A=z(A);return A?[A]:l;}},_setResultHighlighter:function(y){var z;if(this._functionValidator(y)){return y;}z=f.AutoCompleteHighlighters;if(r(y)&&z&&d(z[y])){return z[y];}return l;},_setSource:function(z){var y="autocomplete-sources module not loaded";if((z&&d(z.sendRequest))||z===null){return z;}switch(j.type(z)){case"string":if(this._createStringSource){return this._createStringSource(z);}f.error(y);return l;case"array":return this._createArraySource(z);case"function":return this._createFunctionSource(z);case"object":if(f.JSONPRequest&&z instanceof f.JSONPRequest){if(this._createJSONPSource){return this._createJSONPSource(z);}f.error(y);return l;}return this._createObjectSource(z);}return l;},_sourceSuccess:function(z,y){y.callback.success({data:z,response:{results:z}});},_syncBrowserAutocomplete:function(){var y=this.get(h);if(y.get("nodeName").toLowerCase()==="input"){y.setAttribute("autocomplete",this.get(c)?"on":"off");}},_updateValue:function(z){var B=this.get(e),A,y,C;z=j.trimLeft(z);if(B){A=u(B);C=q.map(u(this.get(k)).split(B),u);y=C.length;if(y>1){C[y-1]=z;z=C.join(A+" ");}z=z+A+" ";}this.set(k,z);},_afterValueChange:function(E){var A,B,y,z=E.newVal,D,C;if(E.src!==v.UI_SRC){this._inputNode.set(k,z);return;}y=this.get("minQueryLength");D=this._parseValue(z)||"";if(y>=0&&D.length>=y){A=this.get("queryDelay");C=this;B=function(){C.fire(t,{inputValue:z,query:D});};if(A){clearTimeout(this._delay);this._delay=setTimeout(B,A);}else{B();}}else{clearTimeout(this._delay);this.fire(a,{prevVal:E.prevVal?this._parseValue(E.prevVal):null});}},_onInputBlur:function(B){var C=this.get(e),y,z,A;if(C&&!this.get("allowTrailingDelimiter")){C=j.trimRight(C);A=z=this._inputNode.get(k);if(C){while((z=j.trimRight(z))&&(y=z.length-C.length)&&z.lastIndexOf(C)===y){z=z.substring(0,y);}}else{z=j.trimRight(z);}if(z!==A){this.set(k,z);}}},_onInputValueChange:function(z){var y=z.newVal;if(y===this.get(k)){return;}this.set(k,y,{src:v.UI_SRC});},_onResponse:function(y,z){if(y===this.get(w)){this._parseResponse(y,z.response,z.data);
}},_defClearFn:function(){this._set(w,null);this._set(m,[]);},_defQueryFn:function(z){var y=z.query;this.sendRequest(y);},_defResultsFn:function(y){this._set(m,y[m]);}};f.AutoCompleteBase=v;},"@VERSION@",{optional:["autocomplete-sources"],requires:["array-extras","base-build","escape","event-valuechange","node-base"]});YUI.add("autocomplete-sources",function(g){var e=g.Lang,a="_sourceSuccess",c="maxResults",d="requestTemplate",b="resultListLocator";function f(){}f.prototype={_YQL_SOURCE_REGEX:/^(?:select|set|use)\s+/i,_createIOSource:function(l){var i={},j={},k=this,n,h,m;j.sendRequest=function(p){var o=function(s){var t=s.request,q,u,r;if(i[t]){k[a](i[t],s);}else{q=k.get(c);u=k.get(d);r=l;if(u){r+=u(t);}r=e.sub(r,{maxResults:q>0?q:1000,query:encodeURIComponent(t)});if(n&&n.isInProgress()){n.abort();}n=g.io(r,{on:{success:function(y,v){var x;try{x=g.JSON.parse(v.responseText);}catch(w){g.error("JSON parse error",w);}if(x){i[t]=x;k[a](x,s);}}}});}};h=p;if(!m){m=true;g.use("io-base","json-parse",function(){j.sendRequest=o;o(h);});}};return j;},_createJSONPSource:function(l){var i={},j={},k=this,h,m;j.sendRequest=function(o){var n=function(p){var q=p.request;if(i[q]){k[a](i[q],p);}else{l._config.on.success=function(r){i[q]=r;k[a](r,p);};l.send(q);}};h=o;if(!m){m=true;g.use("jsonp",function(){if(!(l instanceof g.JSONPRequest)){l=new g.JSONPRequest(l,{format:g.bind(k._jsonpFormatter,k)});}j.sendRequest=n;n(h);});}};return j;},_createStringSource:function(h){if(this._YQL_SOURCE_REGEX.test(h)){return this._createYQLSource(h);}else{if(h.indexOf("{callback}")!==-1){return this._createJSONPSource(h);}else{return this._createIOSource(h);}}},_createYQLSource:function(k){var i={},l={},j=this,h,m;if(!this.get(b)){this.set(b,this._defaultYQLLocator);}l.sendRequest=function(p){var o,n=function(u){var v=u.request,w,s,q,t,r;if(i[v]){j[a](i[v],u);}else{w=function(x){i[v]=x;j[a](x,u);};s=j.get("yqlEnv");q=j.get(c);t={proto:j.get("yqlProtocol")};r=e.sub(k,{maxResults:q>0?q:1000,query:v});if(o){o._callback=w;o._opts=t;o._params.q=r;if(s){o._params.env=s;}}else{o=new g.YQLRequest(r,{on:{success:w},allowCache:false},s?{env:s}:null,t);}o.send();}};h=p;if(!m){m=true;g.use("yql",function(){l.sendRequest=n;n(h);});}};return l;},_defaultYQLLocator:function(i){var j=i&&i.query&&i.query.results,h;if(j&&e.isObject(j)){h=g.Object.values(j)||[];j=h.length===1?h[0]:h;if(!e.isArray(j)){j=[j];}}else{j=[];}return j;},_jsonpFormatter:function(i,j,k){var h=this.get(c),l=this.get(d);if(l){i+=l(k);}return e.sub(i,{callback:j,maxResults:h>0?h:1000,query:encodeURIComponent(k)});}};f.ATTRS={yqlEnv:{value:null},yqlProtocol:{value:"http"}};g.Base.mix(g.AutoCompleteBase,[f]);},"@VERSION@",{optional:["io-base","json-parse","jsonp","yql"],requires:["autocomplete-base"]});YUI.add("autocomplete-list",function(b){var h=b.Lang,u=b.Node,k=b.Array,o=9,r="_CLASS_ITEM",s="_CLASS_ITEM_ACTIVE",d="_CLASS_ITEM_HOVER",t="_SELECTOR_ITEM",f="activeItem",j="alwaysShowList",n="circular",q="hoveredItem",l="id",e="item",c="list",v="result",i="results",p="visible",g="width",m="select",a=b.Base.create("autocompleteList",b.Widget,[b.AutoCompleteBase,b.WidgetPosition,b.WidgetPositionAlign,b.WidgetStack],{ARIA_TEMPLATE:"<div/>",ITEM_TEMPLATE:"<li/>",LIST_TEMPLATE:"<ul/>",initializer:function(){var w=this.get("inputNode");if(!w){b.error("No inputNode specified.");return;}this._inputNode=w;this._listEvents=[];this.DEF_PARENT_NODE=w.get("parentNode");this[r]=this.getClassName(e);this[s]=this.getClassName(e,"active");this[d]=this.getClassName(e,"hover");this[t]="."+this[r];this.publish(m,{defaultFn:this._defSelectFn});},destructor:function(){while(this._listEvents.length){this._listEvents.pop().detach();}},bindUI:function(){this._bindInput();this._bindList();},renderUI:function(){var A=this._createAriaNode(),x=this.get("contentBox"),z=this._inputNode,y,w=z.get("parentNode");y=this._createListNode();this._set("listNode",y);x.append(y);z.addClass(this.getClassName("input")).setAttrs({"aria-autocomplete":c,"aria-expanded":false,"aria-owns":y.get("id"),role:"combobox"});w.append(A);this._ariaNode=A;this._boundingBox=this.get("boundingBox");this._contentBox=x;this._listNode=y;this._parentNode=w;},syncUI:function(){this._syncResults();this._syncVisibility();},hide:function(){return this.get(j)?this:this.set(p,false);},selectItem:function(w){if(w){if(!w.hasClass(this[r])){return this;}}else{w=this.get(f);if(!w){return this;}}this.fire(m,{itemNode:w,result:w.getData(v)});return this;},_activateNextItem:function(){var x=this.get(f),w;if(x){w=x.next(this[t])||(this.get(n)?null:x);}else{w=this._getFirstItemNode();}this.set(f,w);return this;},_activatePrevItem:function(){var x=this.get(f),w=x?x.previous(this[t]):this.get(n)&&this._getLastItemNode();this.set(f,w||null);return this;},_add:function(w){var x=[];k.each(h.isArray(w)?w:[w],function(y){x.push(this._createItemNode(y).setData(v,y));},this);x=b.all(x);this._listNode.append(x.toFrag());return x;},_ariaSay:function(y,w){var x=this.get("strings."+y);this._ariaNode.setContent(w?h.sub(x,w):x);},_bindInput:function(){var z=this._inputNode,x,y,w;if(this.get("align")===null){w=this.get("tokenInput");x=(w&&w.get("boundingBox"))||z;this.set("align",{node:x,points:["tl","bl"]});if(!this.get(g)&&(y=x.get("offsetWidth"))){this.set(g,y);}}this._listEvents.push(z.on("blur",this._onListInputBlur,this));},_bindList:function(){this._listEvents.concat([this.after({mouseover:this._afterMouseOver,mouseout:this._afterMouseOut,activeItemChange:this._afterActiveItemChange,alwaysShowListChange:this._afterAlwaysShowListChange,hoveredItemChange:this._afterHoveredItemChange,resultsChange:this._afterResultsChange,visibleChange:this._afterVisibleChange}),this._listNode.delegate("click",this._onItemClick,this[t],this)]);},_clear:function(){this.set(f,null);this._set(q,null);this._listNode.get("children").remove(true);},_createAriaNode:function(){var w=u.create(this.ARIA_TEMPLATE);return w.addClass(this.getClassName("aria")).setAttrs({"aria-live":"polite",role:"status"});
},_createItemNode:function(w){var x=u.create(this.ITEM_TEMPLATE);return x.addClass(this[r]).setAttrs({id:b.stamp(x),role:"option"}).setAttribute("data-text",w.text).append(w.display);},_createListNode:function(){var w=u.create(this.LIST_TEMPLATE);return w.addClass(this.getClassName(c)).setAttrs({id:b.stamp(w),role:"listbox"});},_getFirstItemNode:function(){return this._listNode.one(this[t]);},_getLastItemNode:function(){return this._listNode.one(this[t]+":last-child");},_syncResults:function(x){var w;if(!x){x=this.get(i);}this._clear();if(x.length){w=this._add(x);this._ariaSay("items_available");}if(this.get("activateFirstItem")&&!this.get(f)){this.set(f,this._getFirstItemNode());}},_syncVisibility:function(w){if(this.get(j)){w=true;this.set(p,w);}if(typeof w==="undefined"){w=this.get(p);}this._inputNode.set("aria-expanded",w);this._boundingBox.set("aria-hidden",!w);if(w){this._syncUIPosAlign();}else{this.set(f,null);this._set(q,null);this._boundingBox.get("offsetWidth");}},_afterActiveItemChange:function(y){var x=this._inputNode,w=y.newVal,z=y.prevVal;if(z&&z._node){z.removeClass(this[s]);}if(w){w.addClass(this[s]);x.set("aria-activedescendant",w.get(l));}else{x.removeAttribute("aria-activedescendant");}if(this.get("scrollIntoView")){(w||x).scrollIntoView();}},_afterAlwaysShowListChange:function(w){this.set(p,w.newVal||this.get(i).length>0);},_afterHoveredItemChange:function(x){var w=x.newVal,y=x.prevVal;if(y){y.removeClass(this[d]);}if(w){w.addClass(this[d]);}},_afterMouseOver:function(w){var x=w.domEvent.target.ancestor(this[t],true);this._mouseOverList=true;if(x){this._set(q,x);}},_afterMouseOut:function(){this._mouseOverList=false;this._set(q,null);},_afterResultsChange:function(w){this._syncResults(w.newVal);if(!this.get(j)){this.set(p,!!w.newVal.length);}},_afterVisibleChange:function(w){this._syncVisibility(!!w.newVal);},_onListInputBlur:function(w){if(!this._mouseOverList||this._lastInputKey===o){this.hide();}},_onItemClick:function(w){var x=w.currentTarget;this.set(f,x);this.selectItem(x);},_defSelectFn:function(w){var x=w.result.text;this._inputNode.focus();this._updateValue(x);this._ariaSay("item_selected",{item:x});this.hide();}},{ATTRS:{activateFirstItem:{value:false},activeItem:{setter:b.one,value:null},alwaysShowList:{value:false},circular:{value:true},hoveredItem:{readOnly:true,value:null},listNode:{readOnly:true,value:null},scrollIntoView:{value:false},strings:{valueFn:function(){return b.Intl.get("autocomplete-list");}},tabSelect:{value:true},visible:{value:false}},CSS_PREFIX:b.ClassNameManager.getClassName("aclist")});b.AutoCompleteList=a;b.AutoComplete=a;},"@VERSION@",{lang:["en"],requires:["autocomplete-base","selector-css3","widget","widget-position","widget-position-align","widget-stack"],after:["autocomplete-sources"],skinnable:true});YUI.add("autocomplete-plugin",function(b){var a=b.Plugin;function c(d){d.inputNode=d.host;if(!d.render&&d.render!==false){d.render=true;}c.superclass.constructor.apply(this,arguments);}b.extend(c,b.AutoCompleteList,{},{NAME:"autocompleteListPlugin",NS:"ac",CSS_PREFIX:b.ClassNameManager.getClassName("aclist")});a.AutoComplete=c;a.AutoCompleteList=c;},"@VERSION@",{requires:["autocomplete-list","node-pluginhost"]});YUI.add("autocomplete",function(a){},"@VERSION@",{use:["autocomplete-base","autocomplete-sources","autocomplete-list","autocomplete-plugin"]});
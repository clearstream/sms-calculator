import{o as e,c as t,a as n,w as s,v as r,t as a,b as c,d as o}from"./vendor.195802e9.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(n){const s=new URL(e,location),r=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((n,a)=>{const c=new URL(e,s);if(self[t].moduleMap[c])return n(self[t].moduleMap[c]);const o=new Blob([`import * as m from '${c}';`,`${t}.moduleMap['${c}']=m;`],{type:"text/javascript"}),l=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(o),onerror(){a(new Error(`Failed to import: ${e}`)),r(l)},onload(){n(self[t].moduleMap[c]),r(l)}});document.head.appendChild(l)})),self[t].moduleMap={}}}("assets/");class l{getMaxSmsSegmentLength(){throw"You must override this method."}getMaxConcatenatedSmsSegmentLength(){throw"You must override this method."}getTextLength(e){throw"You must override this method."}getSegmentsCount(e){const t=this.getTextLength(e);return t<=this.getMaxSmsSegmentLength()?1:Math.ceil(t/this.getMaxConcatenatedSmsSegmentLength())}getMaxTextLength(e){if(e<=0)throw"Segments count should be a positive number.";return 1===e?this.getMaxSmsSegmentLength():this.getMaxConcatenatedSmsSegmentLength()*e}}class i extends l{getMaxSmsSegmentLength(){return 70}getMaxConcatenatedSmsSegmentLength(){return 67}getTextLength(e){return(null!=e?e:"").length}}class h extends l{static getCodePoints(){return{10:[10],12:[27,10],13:[13],32:[32],33:[33],34:[34],35:[35],36:[2],37:[37],38:[38],39:[39],40:[40],41:[41],42:[42],43:[43],44:[44],45:[45],46:[46],47:[47],48:[48],49:[49],50:[50],51:[51],52:[52],53:[53],54:[54],55:[55],56:[56],57:[57],58:[58],59:[59],60:[60],61:[61],62:[62],63:[63],64:[0],65:[65],66:[66],67:[67],68:[68],69:[69],70:[70],71:[71],72:[72],73:[73],74:[74],75:[75],76:[76],77:[77],78:[78],79:[79],80:[80],81:[81],82:[82],83:[83],84:[84],85:[85],86:[86],87:[87],88:[88],89:[89],90:[90],91:[27,60],92:[27,47],93:[27,62],94:[27,20],95:[17],97:[97],98:[98],99:[99],100:[100],101:[101],102:[102],103:[103],104:[104],105:[105],106:[106],107:[107],108:[108],109:[109],110:[110],111:[111],112:[112],113:[113],114:[114],115:[115],116:[116],117:[117],118:[118],119:[119],120:[120],121:[121],122:[122],123:[27,40],124:[27,64],125:[27,41],126:[27,61],161:[64],163:[1],164:[36],165:[3],167:[95],191:[96],196:[91],197:[14],198:[28],201:[31],209:[93],214:[92],216:[11],220:[94],223:[30],224:[127],228:[123],229:[15],230:[29],199:[9],232:[4],233:[5],236:[7],241:[125],242:[8],246:[124],248:[12],249:[6],252:[126],915:[19],916:[16],920:[25],923:[20],926:[26],928:[22],931:[24],934:[18],936:[23],937:[21],8364:[27,101]}}getMaxSmsSegmentLength(){return 160}getMaxConcatenatedSmsSegmentLength(){return 153}getTextLength(e){let t=0;return(null!=e?e:"").split("").forEach((e=>{const n=this.constructor.getCodePoints()[e.charCodeAt(0)];if(void 0===n)throw"Non-GSM char encountered.";t+=n.length})),t}}class g{constructor(e,t=null){this.text=null!=e?e:"",this.encoding=this.detectEncoding(this.text,t)}detectEncoding(e,t=null){if(t instanceof i)return t;const n=e.split("").some((e=>!h.getCodePoints().hasOwnProperty(e.charCodeAt(0))));if(n&&t instanceof h)throw"Non-GSM character encountered.";return t instanceof h?t:n?new i:new h}getValue(){return this.text}getEncoding(){return this.encoding}getLength(){return this.getEncoding().getTextLength(this.getValue())}getNumberOfSegments(){return this.getEncoding().getSegmentsCount(this.getValue())}limit(e){let t=this.getValue();for(;this.getEncoding().getTextLength(t)>e;)t=t.slice(0,-1);return new g(t,this.getEncoding())}isGsm7(){return this.getEncoding()instanceof h}isUcs2(){return this.getEncoding()instanceof i}}const d={data(){var e;return{text:null!=(e=new URL(location.href).searchParams.get("text"))?e:""}},watch:{header(){this.replaceLocation()},text(){this.replaceLocation()}},computed:{fullText(){return this.text},encodedFullText(){return new g(this.fullText)},charactersLabel(){return[this.encodedFullText.getLength(),this.encodedFullText.getEncoding().getMaxTextLength(Math.min(3,this.encodedFullText.getNumberOfSegments()))].join("/")},encodingLabel(){return this.encodedFullText.encoding instanceof h?"GSM-7":this.encodedFullText.encoding instanceof i?"UCS-2":null},creditsLabel(){return Math.min(3,this.encodedFullText.getNumberOfSegments())},maxTextLength(){return this.encodedFullText.getEncoding().getMaxTextLength(Math.min(3,this.encodedFullText.getNumberOfSegments()))},isWithinLengthLimit(){return this.encodedFullText.getLength()<=this.maxTextLength}},methods:{replaceLocation(){const e=new URL(location.href);e.searchParams.delete("text"),this.text.length>0&&e.searchParams.set("text",this.text),window.history.pushState({},document.title,e.toString())}}},u={class:"p-3 sm:p-10"},m={class:"w-full bg-white rounded shadow-md flex flex-col items-center justify-center p-6"},x=n("h1",{class:"mb-2 flex flex-col justify-center items-center"},[n("svg",{viewBox:"0 0 24 22",width:"24",xmlns:"http://www.w3.org/2000/svg",class:"text-pink-500 w-8 mb-2"},[n("path",{d:"m2.2614 12.4299c-.48034 0-.86988-.3879-.86988-.8662 0-.4785.38954-.8663.86988-.8663.48033 0 .86988.3878.86988.8663 0 .4783-.38955.8662-.86988.8662zm19.2685-8.12665c.4803 0 .8699.38787.8699.86613 0 .4785-.3896.86613-.8699.86613-.4806 0-.8701-.38763-.8701-.86613 0-.47826.3895-.86613.8701-.86613zm-6.9302 7.94705c.1313.1394.3151.2188.5072.2188.1926 0 .3761-.0794.5075-.2188l4.8172-5.11408c.3254.18103.6996.28505 1.0983.28505 1.2469 0 2.2614-1.01009 2.2614-2.25189 0-.99981-.6583-1.84848-1.5657-2.14142v-2.335105c0-.382609-.3115-.69299996-.6957-.69299996h-19.2685c-.38427 0-.69576.31039096-.69576.69299996v6.820475h1.39152v-6.12771h17.87694v1.64234c-.9076.29294-1.5659 1.14161-1.5659 2.14142 0 .33956.0781.66048.214.94958l-4.3753 4.64444-5.91528-6.27961c-.26299-.27883-.75172-.27883-1.01495 0l-4.81652 5.11333c-.32566-.18103-.70008-.28529-1.09875-.28529-1.24694 0-2.26164414 1.01037-2.26164414 2.25187 0 .9998.65853414 1.8485 1.56588414 2.1414v2.4248c0 .1844.07349.3609.20462.4907.13065.1294.30693.2023.49114.2023h.0024l6.52746-.0225v4.4424c0 .2843.17436.5397.43998.6444.08286.0328.1698.0486.25554.0486.18877 0 .3737-.0763.50771-.2188l4.61021-4.8941h6.9252c.3842 0 .6957-.3104.6957-.693v-7.03448h-1.3915v6.34178h-6.5308c-.1924 0-.3759.0794-.5075.2188l-3.613 3.8356v-3.3861c0-.1843-.0735-.3608-.20464-.4909-.13041-.1294-.30693-.2021-.49114-.2021h-.00216l-6.5277.0223v-1.7297c.90734-.2929 1.56588-1.1416 1.56588-2.1414 0-.3393-.07806-.6602-.21375-.9491l4.37485-4.6439z",fill:"currentColor"})]),n("span",{class:"font-semibold text-xl text-gray-800"},"SMS Calculator")],-1),f=n("p",{class:"mb-6 text-sm text-center text-gray-800"}," Use the form below to calculate the number of credits a text message will use. ",-1),p={class:"flex flex-col sm:flex-row justify-around flex-wrap mt-6"},L={class:"w-28 h-14 flex flex-col items-center justify-center"},w=n("p",{class:"text-gray-800"},"Characters",-1),S={class:"w-28 h-14 flex flex-col items-center justify-center"},v=n("p",{class:"text-gray-800"},"Encoding",-1),b={class:"text-gray-400"},y={class:"w-28 h-14 flex flex-col items-center justify-center"},M=n("p",{class:"text-gray-800"},"Credits",-1),T={class:"text-gray-400"},C=n("p",{class:"text-xs text-center mt-6 text-gray-400"},[c(" Created by "),n("a",{class:"font-semibold",href:"https://clearstream.io",target:"_blank"},"Clearstream"),c(", "),n("a",{href:"https://clearstream.io",target:"_blank",class:"italic"},"a texting software for churches.")],-1);d.render=function(c,o,l,i,h,g){return e(),t("div",u,[n("div",m,[x,f,s(n("textarea",{"onUpdate:modelValue":o[1]||(o[1]=e=>h.text=e),class:"bg-gray-100 text-gray-700 w-full rounded px-6 py-4 focus:outline-none",rows:"7",placeholder:"Type your text..."},null,512),[[r,h.text]]),n("div",p,[n("div",L,[w,n("p",{class:[g.isWithinLengthLimit?"text-gray-400":"text-red-500"]},a(g.charactersLabel),3)]),n("div",S,[v,n("p",b,a(g.encodingLabel),1)]),n("div",y,[M,n("p",T,a(g.creditsLabel),1)])])]),C])};o(d).mount("#app");

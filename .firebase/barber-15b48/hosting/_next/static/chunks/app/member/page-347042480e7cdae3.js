(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[601],{2975:(e,s,a)=>{Promise.resolve().then(a.bind(a,6712))},708:(e,s,a)=>{"use strict";a.d(s,{db:()=>d,j:()=>i,k:()=>n});var t=a(9904),l=a(399),r=a(7058);let c=(0,t.Wp)({apiKey:"AIzaSyA57D78rdd5x_RCNQT1EhBtuBdrdbFodLs",authDomain:"barber-15b48.firebaseapp.com",projectId:"barber-15b48",storageBucket:"barber-15b48.firebasestorage.app",messagingSenderId:"215556113867",appId:"1:215556113867:web:30c08a848e185dcf0d224e",measurementId:"G-0KZEYZWEFL"}),d=(0,r.aU)(c),i=(0,l.xI)(c),n=(0,r.aU)(c)},6712:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>i});var t=a(5155),l=a(2115),r=a(7396),c=a(708),d=a(7058);let i=()=>{let[e,s]=(0,l.useState)([]),[a,i]=(0,l.useState)(!0);return(0,l.useEffect)(()=>{(async()=>{try{let e=(0,d.rJ)(c.db,"users"),a=(await (0,d.GG)(e)).docs.map(e=>({id:e.id,...e.data()}));s(a)}catch(e){console.error("Error fetching users: ",e)}finally{i(!1)}})()},[]),(0,t.jsxs)("div",{className:"relative min-h-screen bg-gray-100",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-[#1a1310] overflow-hidden",children:(0,t.jsx)("img",{src:"/images/barber.jpg",alt:"Barber cutting hair",className:"w-full h-screen object-cover"})}),(0,t.jsx)("div",{className:"relative z-10 flex items-center justify-center min-h-screen p-6",children:(0,t.jsxs)("div",{className:" p-6 rounded-lg shadow-lg w-full max-w-4xl",children:[(0,t.jsx)("h1",{className:"text-4xl font-bold text-white mb-6 text-center",children:"Member List"}),a?(0,t.jsx)("p",{className:"text-black text-center",children:"Loading..."}):0===e.length?(0,t.jsx)("p",{className:"text-black text-center",children:"No members found."}):(0,t.jsx)("div",{className:"bg-white p-4 rounded-lg shadow-lg space-y-4",children:(0,t.jsxs)("table",{className:"w-full text-left table-auto",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"bg-yellow-600 text-black",children:[(0,t.jsx)("th",{className:"px-5 py-2",children:"Name"}),(0,t.jsx)("th",{className:"px-5 py-2",children:"Email"}),(0,t.jsx)("th",{className:"px-5 py-2",children:"Phone"})]})}),(0,t.jsx)("tbody",{children:e.map(e=>(0,t.jsxs)("tr",{className:"bg-white text-black",children:[(0,t.jsx)("td",{className:"px-5 py-2",children:e.displayName}),(0,t.jsx)("td",{className:"px-5 py-2",children:e.email}),(0,t.jsx)("td",{className:"px-5 py-2",children:e.phoneNumber})]},e.id))})]})}),(0,t.jsx)("div",{className:"flex justify-end mt-6",children:(0,t.jsx)(r.default,{href:"/adminIsi",children:(0,t.jsx)("button",{className:"bg-yellow-600 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-500 transition",children:"Back to Admin Page"})})})]})})]})}}},e=>{var s=s=>e(e.s=s);e.O(0,[992,882,459,396,441,517,358],()=>s(2975)),_N_E=e.O()}]);
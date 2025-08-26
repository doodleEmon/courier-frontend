$ npm run build

> courier-management-frontend@0.1.0 build
> next build --turbopack

   ▲ Next.js 15.5.0 (Turbopack)
   - Environments: .env

   Creating an optimized production build ...
 ✓ Finished writing to disk in 398ms
 ✓ Compiled successfully in 16.1s

Failed to compile.

./src/app/(auth)/login/page.tsx
100:20  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities

./src/app/(dashboard)/admin/dashboard/page.tsx
10:22  Warning: 'users' is assigned a value but never used.  @typescript-eslint/no-unused-vars      

./src/app/(dashboard)/delivery/tracking/page.tsx
28:63  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/app/(main)/page.tsx
33:8  Warning: React Hook useEffect has a missing dependency: 'nextSlide'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps

./src/components/common/AdminLayout.tsx
5:8  Warning: 'Footer' is defined but never used.  @typescript-eslint/no-unused-vars
9:21  Warning: 'CgTrack' is defined but never used.  @typescript-eslint/no-unused-vars

./src/components/common/CustomLayout.tsx
5:8  Warning: 'Footer' is defined but never used.  @typescript-eslint/no-unused-vars

./src/redux/actions/admin/adminActions.ts
27:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
56:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
71:53  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
85:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
114:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any        
142:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any        
171:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any        

./src/redux/actions/agent/agentActions.ts
4:10  Warning: 'RootState' is defined but never used.  @typescript-eslint/no-unused-vars
28:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
58:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
86:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
114:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any        

./src/redux/actions/auth/authActions.ts
24:19  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
50:19  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/redux/actions/customer/customerActions.ts
35:23  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
60:23  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
91:23  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
107:19  Warning: 'res' is assigned a value but never used.  @typescript-eslint/no-unused-vars       
115:23  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any        

./src/redux/slices/agent/agentSlice.ts
9:12  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/types/type.ts
72:12  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
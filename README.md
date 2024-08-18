# Todo application

##### Project convention
***การตั้งชื่อไฟล์:*** <br>
1. `PascalCase` สำหรับ ชื่อ Type definition, Interface, Component function, Component, Page เช่น `MyComponent.tsx`, `HomePage.tsx`, `function MyComponent()`
2. `camelCase` สำหรับไฟล์ utility, hooks, variabble เช่น `formatDate.ts`, `const myUser = []`
3. `kebab-case` สำหรับการตั้งชื่อ component ที่ใช้ reuse, css, folder name เพื่อป้องการกันสับสนกับชื่อ component หลัก เช่น `dropdown-menu.tsx`, `main-layout.tsx`

***การกำหนด indent***
1. `indent_style` using `space`
2. `indent_size` using `2`


***รูปแบบข้อความ Commit*** <br>
`<type>: คำอธิบาย` เช่น `feat: add new user profile`, `fix: user bug when change password`

`<type>`
1. feat: เพิ่มฟีเจอร์ใหม่
2. fix: แก้ไขข้อผิดพลาด
3. docs: การเปลี่ยนแปลงที่เกี่ยวข้องกับเอกสาร
4. style: การเปลี่ยนแปลงที่ไม่กระทบต่อโค้ด (เช่น การจัดรูปแบบโค้ด)
5. refactor: ปรับปรุงโครงสร้างโค้ดโดยไม่กระทบการทำงานของโปรแกรม
6. test: เพิ่มหรือแก้ไขเทส
<br>
<br>
##### Project structure 
```text
src/
├── api/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── api/
│   │   └── route.ts
│   ├── [dynamic]/
│   │   └── page.tsx
├── components/
├── lib/
├── types/
├── services/
├── config/
```

รายละเอียดโครงสร้าง ภายใต้ src folder ตามโครงสร้าง nextjs หรือจะไม่ใช้ src folder ก็ได้ขึ้นอยู่กับการตกลงของทีมพัฒนา
**api**:
สำหรับเก็บโค้ดที่เกี่ยวข้องกับการเรียก API หรือ services อื่นๆ ที่โปรเจกต์ต้องการ
<br>
<br>
**app**:
สำหรับเก็บ components ที่เกี่ยวกับการแสดงผลหน้าต่างๆ และจัดการ Routing, Server action, API route ของ nextjs โดยใช้ router แบบ App Router
<br>
<br>
**components**:
สำหรับเก็บ components ที่สามารถนำไปใช้ซ้ำได้ในหลายๆตำแหน่ง โดยจะรวมทุก component และ layout ที่ใช้ในโปรเจค
<br>
<br>
**lib**:
สำหรับเก็บโค้ดที่เป็น library, helper functions หรือ third-party integrations เช่น การเชื่อมต่อกับ Firebase, cloud storage  เป็นต้น
<br>
<br>
**types**:
สำหรับเก็บ TypeScript type definitions และ interfaces โดย Type ทั้งหมดใน project จะถูกจัดระเบียบให้ใช้งานได้สะดวกและเป็นระเบียบ และสามารถ reuse ได้
<br>
<br>
**other**:
ไฟล์อื่นๆที่อยู่ในระดับ Root
1. `public` ไฟล์ static เช่นรูปภาพ css lib
2. `config` ไฟล์ config ต่างๆของโปรเจค typescript config, package.json, tailwind

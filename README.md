# MyAngularApp
- Hiển thị angular material table - fake data
- Setup rxjs store
- Call api - render list employees
- 

Tạo ứng dụng Angular 18 (ko có app.module.ts) hiển thị danh sách users nằm trong components folder ra material angular UI,
Call api từ mockapi.io, https://681ac46717018fe50578a9b1.mockapi.io/api/v1/users
có cột name, avatar, email, age, gender, created, updated, action
- Sử dụng rxjs tổ chức có folder như sau
store ( actions, models, reducers, selectors )

Sử dụng SASS để làm UI đẹp


- Thêm cột checkbox - Select all
- Thêm sort column table ( toSignal )
- Viết custom pipe cho data column

# 9/5/2025
On Table create column Action( Edit, Delete )

Click Edit: Show popup (use popup material)

Name (Requried)

Age ( Use drirective for only allow enter number)

Email(Validate email)

Action:

Yes: → Edit user, Reload table

No → close popup, clear input form
db.createUser({
    user: "root",
    pwd: "123456",
    roles: [
        {
            role: "readWrite",
            db:  "license"
        }
    ]
});
db.createUser({
    user: "admin",
    pwd: "123",
    roles: [
        {
            role: "readWrite",
            db:  "license"
        }
    ]
});
db.createUser({
    user: "user",
    pwd: "123",
    roles: [
        {
            role: "readWrite",
            db:  "license"
        }
    ]
});
db.users.insert({
    username: "root",
    password: "123",
    role: "admin"
});
db.users.insert({
    username: "user",
    password:"123",
    role: "USER"
});
db.users.insert({
    username: "admin",
    password:"123",
    role: "admin"
});
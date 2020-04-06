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
db.users.insert({
    name: "root"
});

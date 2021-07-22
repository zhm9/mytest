export const userList = new Array(33).fill(0).map((_, idx) => ({
    key: idx,
    name: `用户[${idx + 1}]`,
    age: Math.floor(Math.random() * 100),
    sex: Math.random() > 0.5 ? '男' : '女',
    email: '---'
}));
class MockService {

    queryPagedUserList(page, pageSize) {
        const start = pageSize * (page - 1);
        return Promise.resolve({
            total: userList.length,
            rows: userList.slice(start, start + pageSize)
        });
    }


    deleteUser(userId) {
        // 请补全
        console.log(userId);
        userList.map((e, i) => {
            if (e.key === userId) {
                userList.splice(i, 1)
            }
        })
        return {
            code: 200
        }

    }

    editUser(user) {
        // 请补全
        userList.map((e, i) => {
            if (e.key === user.key) {
                userList[i] = user
                console.log(userList);
            }
        })
        return {
            code: 200
        }
    }
}

export const mockService = new MockService();
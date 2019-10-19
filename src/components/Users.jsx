import React, { useState, useEffect } from 'react'
import { getUsers } from './../services/users'
import Table from './common/Table'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const users = getUsers()
        setUsers(users)
    }, [])

    return (
        users.length && <Table
            title="Users"
            records={users}
        />
    )
}

export default Users
'use client'
import { makeAutoObservable } from "mobx"

 class UserStore {

    constructor() {
        this._isAuth = false
        this._user = []
        this._users = []
        this._usersCount = 0
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setUsers(users) {
        this._users = users
    }
    setUsersCount(count) {
        this._usersCount = count
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get users() {
        return this._users
    }

    get usersCount() {
        return this._usersCount
    }

}

export const userStore = new UserStore()
import router from "@/router";
import NotificationProgress from "@/components/NotificationProgress.vue";
import {createApp} from "vue";

import {settings} from "@/utils/settings";
import {constants} from "@/utils/constants";
import axios from "axios";

export const methods = {
    runNotification(text) {
        const div = document.getElementById("notification");
        const app = createApp(NotificationProgress, {text: text});
        app.mount(div);
    },
    checkCookies(cookies, access, callback) {
        if(settings.designMode)
            return callback ? callback() : null;
        if(cookies.get("token") != null) {
            this.authorizedGETRequest(cookies, "/user/current", response => {
                localStorage.setItem("model", JSON.stringify(response.data.body))
                if(response.data.body.role !== access && access !== constants.Role.ANY) {
                    if(response.data.body.role === constants.Role.DOCTOR)
                        router.push({name: "appointments"});
                    else if(response.data.body.role === constants.Role.ADMIN)
                        router.push({name: "doctors-directory"});
                } else {
                    if(callback)
                        callback(response.data.body.role);
                }
            }, error => {
                console.log(error);
                if(error.code === "ERR_NETWORK")
                    this.runNotification("Не удалось подключиться к серверу");
                if(access !== constants.Role.UNAUTHORIZED)
                    router.push({ name: "login" })
            });
        } else if(access !== constants.Role.UNAUTHORIZED) {
            router.push({ name: "login" })
        }
    },
    authorizedGETRequest(cookies, route, success, fail) {
        (async () => {
            let response = await axios.get(`${settings.serverUrl}${route}`, {
                headers: {'Authorization': `Bearer ${cookies.get("token")}`}
            }).catch(fail);
            success(response);
        })();
    },
    authorizedPOSTRequest(cookies, route, data, success, fail) {
        (async () => {
            let response = await axios.post(`${settings.serverUrl}${route}`, data,
                {
                    headers: {'Authorization': `Bearer ${cookies.get("token")}`}
                }).catch(fail);
            success(response);
        })();
    },
    authorizedDELRequest(cookies, route, success, fail) {
        (async () => {
            let response = await axios.delete(`${settings.serverUrl}${route}`,
                {
                    headers: {'Authorization': `Bearer ${cookies.get("token")}`}
                }).catch(fail);
            success(response);
        })();
    },
    authorizedPATCHRequest(cookies, route, data, success, fail) {
        (async () => {
            let response = await axios.patch(`${settings.serverUrl}${route}`, data,
                {
                    headers: {'Authorization': `Bearer ${cookies.get("token")}`}
                }).catch(fail);
            success(response);
        })();
    },
    setMeta(data) {
        if(settings.alertMode)
            console.log("Wrote to meta: ", data);
        sessionStorage.setItem("transportInfo", JSON.stringify(data));
    },
    getMeta() {
        console.log("Meta readed");
        let data = JSON.parse(sessionStorage.getItem("transportInfo"));
        sessionStorage.removeItem("transportInfo");
        return data;
    },
    getDoctorName() {
        if(localStorage.getItem("model")) {
            let model = JSON.parse(localStorage.getItem("model"));
            return model.surname + " " + model.name + " " + model.lastname;
        }
        return "Иванов Иван Иванович";
    },
    getDoctorID() {
        if(localStorage.getItem("model")) {
            let model = JSON.parse(localStorage.getItem("model"));
            return model.id;
        }
        return -1;
    },
    getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },
    getTrimester(startDateString, dateString) {
        if(startDateString.length !== 10) return "";
        if(dateString.length !== 10) return "";
        let startDate = new Date(startDateString);
        let date = new Date(dateString);
        let week = (date-startDate) / (1000*60*60*24*7) + 1;
        if(week < 1) return "";
        if(week < 14) return "(I)";
        if(week < 28) return "(II)"
        return "(III)";
    },
    recursiveJSONAssignment(starter, current) { // may be useful in future
        if(Array.isArray(starter) || starter.constructor == Object) {
            if(Array.isArray(starter) !== Array.isArray(current))
                return starter;
            for(let i in starter) {
                try {
                    if ((starter.constructor == Object && i in current) || (Array.isArray(current) && current.length >= i)) {
                        if (Array.isArray(starter[i]) || starter[i].constructor == Object)
                            starter[i] = this.recursiveJSONAssignment(starter[i], current[i]);
                        else
                            starter[i] = current[i];
                    }
                } catch (ex) {
                    //
                }
            }
        }
        return starter;
    }
}
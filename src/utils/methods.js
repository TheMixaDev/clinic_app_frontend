import router from "@/router";
import NotificationProgress from "@/components/NotificationProgress.vue";
import {createApp} from "vue";

import {settings} from "@/utils/settings";
import {constants} from "@/utils/constants";
import axios from "axios";

export const methods = {
    currentNotification: null,
    clearNotification() {
        this.currentNotification = null;
    },
    runNotification(text) {
        if(this.currentNotification)
            this.currentNotification.forceQuit();
        const div = document.getElementById("notification");
        const app = createApp(NotificationProgress, {text: text});
        this.currentNotification = app.mount(div);
    },
    checkCookies(cookies, access, callback, failCallback) {
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
                    router.push({name: "login"})
                if(failCallback)
                    failCallback();
            });
        } else if(access !== constants.Role.UNAUTHORIZED) {
            router.push({ name: "login" })
            if(failCallback)
                failCallback();
        } else if(access === constants.Role.UNAUTHORIZED && failCallback)
            failCallback();
    },
    authorizedGETRequest(cookies, route, success, fail) {
        (async () => {
            let response = await axios.get(`${settings.serverUrl}${route}`, {
                headers: {'Authorization': `Bearer ${cookies.get("token")}`}
            }).catch(fail);
            if(response)
                success(response);
        })();
    },
    authorizedGETDownload(cookies, route, success, fail) {
        (async () => {
            let response = await axios({
                url: `${settings.serverUrl}${route}`,
                method: 'GET',
                responseType: 'blob',
                headers: {'Authorization': `Bearer ${cookies.get("token")}`}
            }).catch(fail);
            if(response)
                success(response);
        })();
    },
    authorizedPOSTRequest(cookies, route, data, success, fail, isForm) {
        let config = {
            headers: {'Authorization': `Bearer ${cookies.get("token")}`}
        };
        if(isForm)  config.headers['Content-Type'] = 'multipart/form-data';
        (async () => {
            let response = await axios.post(`${settings.serverUrl}${route}`, data, config).catch(fail);
            if(response)
                success(response);
        })();
    },
    authorizedDELRequest(cookies, route, success, fail) {
        (async () => {
            let response = await axios.delete(`${settings.serverUrl}${route}`,
                {
                    headers: {'Authorization': `Bearer ${cookies.get("token")}`}
                }).catch(fail);
            if(response)
                success(response);
        })();
    },
    authorizedPATCHRequest(cookies, route, data, success, fail) {
        (async () => {
            let response = await axios.patch(`${settings.serverUrl}${route}`, data,
                {
                    headers: {'Authorization': `Bearer ${cookies.get("token")}`}
                }).catch(fail);
            if(response)
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
        if(startDateString[0] === '0') startDateString = startDateString.replace('0','2');
        if(dateString[0] === '0') dateString = dateString.replace('0','2');
        let startDate = new Date(startDateString);
        let date = new Date(dateString);
        let week = (date-startDate) / (1000*60*60*24*7) + 1;
        if(week < 1) return "";
        if(week < 14) return "(I)";
        if(week < 28) return "(II)"
        return "(III)";
    },
    recursiveJSONAssignment(starter, current) {
        if(Array.isArray(starter) || starter.constructor == Object) {
            if(Array.isArray(starter) !== Array.isArray(current))
                return starter;
            if(Array.isArray(starter) && Array.isArray(current) && starter.length === 0 && current.length !== 0)
                return current; // MAY BE HARMFUL IN FUTURE UPDATES
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
    },
    downloadFile(name, data) {
        const href = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    },
    getIMT(weight, height, numeric) {
        let IMT = Math.floor(weight.replace(",",".") / Math.pow(height.replace(",",".")/100,2) * 10) / 10;
        if(IMT)
            return IMT > 200 ? (numeric ? 0 : '') : IMT;
        return (numeric ? 0 : '');
    },
    limit(number, min, max) {
        return number >= min ? (number <= max ? number : max) : min;
    },
    getSelectedIds(arr) {
        let result = [];
        for(let i of arr)
            if(i.value)
                result.push(i.id);
        return result;
    },
    getFromSelectedIds(original, selected) {
        for(let i of original)
            if(selected.includes(i.id))
                i.value = true;
        return original;
    },
    dateDisplayDDMMGG(date) { // may be useful
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;
        return dd + '.' + mm + '.' + yy;
    },
    dateFromDDMMGG(date) {
        return date.replace("00","20");
    }
}
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
    checkCookies(cookies, access) {
        if(settings.designMode)
            return;
        if(cookies.get("token") != null) {
            this.authorizedGETRequest(cookies, "/user/current", response => {
                console.log(response.data.body.role)
                console.log(access)
                if(response.data.body.role !== access) {
                    if(response.data.body.role === constants.Role.DOCTOR)
                        router.push({name: "appointments"});
                    else if(response.data.body.role === constants.Role.ADMIN)
                        router.push({name: "doctors-directory"});
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
        axios.request({
            method: 'get',
            url: `${settings.serverUrl}${route}`,
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`
            }
        }).then(success).catch(fail);
    }
}
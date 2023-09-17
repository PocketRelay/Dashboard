import { writable, type Writable } from "svelte/store";
import { getDashboardDetails, type DashboardDetails, type ServerDetails, getServerDetails } from "./api/server";


async function loadDashboardDetails() {
    try {
        let [dashboardDetails, serverDetails]: [DashboardDetails, ServerDetails] = await Promise.all([
            getDashboardDetails(),
            getServerDetails(),
        ]);

        disableAccountCreation.set(dashboardDetails.disable_registration);
        serverVersion.set("0.5.6")
    } catch (error) {
        console.error("Failed to load dashboard details", error);
    }
}

loadDashboardDetails();

export const disableAccountCreation: Writable<boolean> = writable(false);
export const serverVersion: Writable<string | null> = writable(null);
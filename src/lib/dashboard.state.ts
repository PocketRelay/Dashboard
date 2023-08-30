import { writable, type Writable } from "svelte/store";
import { getDashboardDetails, type DashboardDetails } from "./api/server";


async function loadDashboardDetails() {
    try {
        const details: DashboardDetails = await getDashboardDetails();
        disableAccountCreation.set(details.disable_registration);
    } catch (err) {
        console.error("Failed to load dashboard details");
    }
}

loadDashboardDetails();

export const disableAccountCreation: Writable<boolean> = writable(false);

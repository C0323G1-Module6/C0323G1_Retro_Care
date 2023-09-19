import axios from "axios";

export function getMaxCode() {
    try {
        const result = axios.get("http://localhost:8080/api/invoice/code")
    } catch (e) {
        console.log(e);
    }
}
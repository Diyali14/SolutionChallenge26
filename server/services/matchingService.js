import axios from "axios";

export const callSpringBoot = async (data) => {
    try {
        const res = await axios.post(
            "http://localhost:8080/optimize", // your Spring Boot endpoint
            data
        );
        return res.data;
    } catch (err) {
        console.error("Spring Boot Error:", err.message);
        throw err;
    }
};
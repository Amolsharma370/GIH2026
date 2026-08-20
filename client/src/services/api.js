import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";
const api = axios.create({ baseURL: API_URL, timeout: 30000 });

export async function fetchBhopalDemo() {
  const { data } = await api.get("/scenarios/demo/bhopal");
  return data;
}

export async function runScenario(inputs) {
  const { data } = await api.post("/scenarios/run", inputs);
  return data;
}

export async function getScenario(id) {
  const { data } = await api.get(`/scenarios/${id}`);
  return data;
}

export async function listScenarios() {
  const { data } = await api.get("/scenarios");
  return data;
}

export async function getFacilities() {
  const { data } = await api.get("/facilities");
  return data;
}

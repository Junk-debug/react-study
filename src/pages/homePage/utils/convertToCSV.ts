/* eslint-disable no-restricted-syntax */
import { Character } from "../../../api/types";

export function convertToCSV(characters: Character[]) {
  if (characters.length === 0) {
    return "";
  }

  const getHeaders = () => {
    const headers: string[] = [];

    for (const [key, value] of Object.entries(characters[0])) {
      if (typeof value === "string" || typeof value === "number") {
        headers.push(key);
      } else if (typeof value === "object") {
        for (const innerKey of Object.keys(value)) {
          headers.push(`${key}/${innerKey}`);
        }
      }
    }

    return headers.join(",");
  };

  const getRows = () => {
    const rows: string[] = [];

    for (const character of characters) {
      const row: string[] = [];
      for (const value of Object.values(character)) {
        if (typeof value === "string" || typeof value === "number") {
          row.push(value.toString());
        } else if (typeof value === "object") {
          for (const innerKey of Object.keys(value)) {
            row.push(value[innerKey]);
          }
        }
      }

      rows.push(row.join(","));
    }

    return rows;
  };

  const headers = getHeaders();
  const rows = getRows();

  return [headers, ...rows].join("\n");
}

export function createDownloadCVSLink(csvData: string) {
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  return URL.createObjectURL(blob);
}

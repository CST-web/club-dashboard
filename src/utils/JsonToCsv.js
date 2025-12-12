export function downloadJSONAsCSV(jsonData, filename = "data.csv") {
  if (!jsonData || !jsonData.length) return;

  const keys = Object.keys(jsonData[0]);
  const csvRows = [];

  // Header row
  csvRows.push(keys.join(","));

  // Data rows
  for (const row of jsonData) {
    const values = keys.map((key) => `"${row[key]}"`); // wrap values in quotes
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

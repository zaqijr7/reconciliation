import db from "@/utils/mysql";
import { parse } from "csv-parse";

export async function GET(request: Request) {
  db.query("SELECT * FROM `payment_method`", (err, result) => {
    console.log(result, "<<< cek");
  });

  return new Response("Hello, Next.js!", {
    status: 200,
  });
}

export const POST = async (req, res) => {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const getSourcePayment = formData.get("source_payment");

    if (!file) {
      return new Response(JSON.stringify({ error: "No files received." }), {
        status: 400,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // const getExtensionFile = file.name.split(".");
    // const idFile = crypto.randomUUID();
    // const filename = `${idFile}.${getExtensionFile[getExtensionFile.length - 1]}`;
    // const filePath = path.join(process.cwd(), "public/assets", filename);

    // await writeFile(filePath, buffer);

    // db.query(
    //   `INSERT INTO temporary_file_upload (id_file, name_file, source_payment, createdBy) VALUES ('${idFile}', '${filename}', '${getSourcePayment}', 'TEST')`,
    //   (err, result) => {
    //     console.log(err, "<<< disini ada error");
    //     console.log(result, "<<<< result");
    //   },
    // );

    const parser = parse({
      columns: true,
      delimiter: ",",
      trim: true,
      from_line: 2,
    }); // Skip the header row

    const rows = [];

    parser.on("data", (row) => {
      console.log("Parsed row:", row); // Log each parsed row
      rows.push(row); // Collect rows in an array (if needed)
    });

    parser.on("error", (err) => {
      console.error("Error while parsing CSV:", err.message);
      // throw new Error("Failed to parse CSV file");
    });

    parser.on("end", () => {
      console.log("Finished parsing CSV file:", rows);
      // You can process the rows array here (e.g., store in DB or perform other logic)
    });

    // Pass the buffer to csv-parse
    parser.write(buffer);
    parser.end();

    return new Response(JSON.stringify({ message: "Success", status: 201 }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error occurred", error);
    return new Response(JSON.stringify({ message: "Failed", status: 500 }), {
      status: 500,
    });
  }
};

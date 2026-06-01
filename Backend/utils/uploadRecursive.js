
const fs = require("fs").promises;
const path = require("path");
const supabase = require("../config/supabase-config");

async function uploadRecursive(
  localPath,
  remoteBasePath
) {
  const stat =
    await fs.stat(localPath);

  // file
  if (stat.isFile()) {

    const fileContent =
      await fs.readFile(localPath);

    const { error } =
      await supabase.storage
        .from("chronixBucket")
        .upload(
          remoteBasePath,
          fileContent,
          {
            upsert: true
          }
        );

    if (error) {
      console.error(
        `Failed to upload ${remoteBasePath}:`,
        error.message
      );

      return;
    }

    console.log(
      `Uploaded: ${remoteBasePath}`
    );

    return;
  }

  // folder
  const items =
    await fs.readdir(localPath);

  for (const item of items) {

    await uploadRecursive(
      path.join(localPath, item),

      path.posix.join(
        remoteBasePath,
        item
      )
    );
  }
}


module.exports = {
    uploadRecursive
};
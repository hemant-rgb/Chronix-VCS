const fs = require("fs").promises;
const path = require("path");
const supabase = require("../config/supabase-config");


async function downloadRecursive(
  remoteFolder,
  localFolder
) {

  // create local folder
  await fs.mkdir(localFolder, {
    recursive: true
  });

  // list remote contents
  const {
    data: items,
    error
  } =
    await supabase.storage
      .from("chronixBucket")
      .list(remoteFolder);

  if (error) {
    console.error(
      `Failed to list ${remoteFolder}:`,
      error.message
    );

    return;
  }

  for (const item of items) {

    const remotePath =
      path.posix.join(
        remoteFolder,
        item.name
      );

    const localPath =
      path.join(
        localFolder,
        item.name
      );

    // file
    if (item.metadata) {

      const {
        data,
        error
      } =
        await supabase.storage
          .from("chronixBucket")
          .download(remotePath);

      if (error) {
        console.error(
          `Failed to download ${remotePath}:`,
          error.message
        );

        continue;
      }

      const buffer =
        Buffer.from(
          await data.arrayBuffer()
        );

      await fs.writeFile(
        localPath,
        buffer
      );

      console.log(
        `Pulled: ${remotePath}`
      );

      continue;
    }

    // folder
    await downloadRecursive(
      remotePath,
      localPath
    );
  }
}


module.exports = {
    downloadRecursive
};
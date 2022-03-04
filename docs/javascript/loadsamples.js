/**
 * This file is unique for each sample browser. It contains the logic specific to each repo for loading the samples as needed.
 */
var jsonPath = "https://pnp.github.io/mgt-samples/samples.json";
if (window.location.host.toLowerCase() !== "pnp.github.io") {
  // When serving locally there is no /teams-dev-samples in the path
  jsonPath = window.location.origin + "/samples.json";
  console.log(`Reading samples from ${jsonPath}`);
}

/**
 * Reads a sample metadata and returns a pre-populated HTML element
 * @param {*} sample 
 * @returns 
 */
function loadSample(sample, filter) {
    try {
        var title = _.escape(sample.title);
        var escapedDescription = _.escape(sample.shortDescription);

        var shortDescription = sample.shortDescription; //.length > 80 ? sample.shortDescription.substr(0, 77)  : sample.shortDescription;
        var thumbnail = "https://pnp.github.io/mgt-samples/img/_nopreview.png";
        //var categories = sample.categories[0];

        if (sample.thumbnails && sample.thumbnails.length > 0) {
          thumbnail = sample.thumbnails[0].url;
        }

        var components = [];
        var framework = "";
        var html = sample.preview.html !== undefined;  
        var css = sample.preview.css !== undefined;
        var javascript = sample.preview.js !== undefined;

        var metadata = sample.metadata;
        metadata.forEach(meta => {
          switch (meta.key) {
            case "MGT-COMPONENT":
              components.push(meta.value);
              break;
            case "CLIENT-SIDE-DEV":
              framework = meta.value;
              break;
            default:
              break;
          }
        });

              
        // Filter our samples that don't match categories
        if (filter !== "" && !components.includes(filter)) {
          return null;
        }

const dtModified = new Date(sample.updateDateTime)

        var modified = moment(dtModified).toISOString();
        var authors = sample.authors;
        var authorsList = "";
        var authorAvatars = "";
        var authorName = "";
        var authorsGitHub = "";
        var productTag = framework.toLowerCase();
        var productName = framework;
        var componentsList = components.join(", ");


        // Build the authors array
        if (authors.length < 1) {
          console.log("Sample has no authors", sample);
        } else {
          authors.forEach(author => {
            if (authorsList !== "") {
              authorsList = authorsList + ", ";
            }
            authorsList = authorsList + author.name;
            authorsGitHub = authorsGitHub + " " + author.gitHubAccount;

            var authorAvatar = `<div class="author-avatar">
              <div role="presentation" class="author-coin">
                <div role="presentation" class="author-imagearea">
                  <div class="image-400">
                    <img class="author-image" loading="lazy" src="${author.pictureUrl}" alt="${author.name}" title="${author.name}">
                  </div>
                </div>
              </div>
            </div>`;
            authorAvatars = authorAvatar + authorAvatars;
          });

          authorName = authors[0].name;
          if (authors.length > 1) {
            authorName = authorName + ` +${authors.length - 1}`;
          }
        }

        // Extract tags
        var tags = "";
        $.each(sample.tags, function (_u, tag) {
          tags = tags + "#" + tag + ",";
        });

        // Build a keyword tag for searching
        var keywords = title + " " + escapedDescription + " " + authorsList + " " + authorsGitHub + " " + tags + " " + components.join(" ");
        keywords = keywords.toLowerCase();

        // Build the HTML to insert
        var $items = $(`
<a class="sample-thumbnail" href="${sample.url}" data-modified="${modified}" data-title="${title}" data-keywords="${keywords}" data-tags="${tags}" data-component="${componentsList}" data-framework="${framework}" data-html="${html}" data-css="${css}" data-js="${javascript}">
  <div class="sample-inner">
    <div class="sample-preview">
      <img src="${thumbnail}" loading="lazy" alt="${title}">
    </div>
    <div class="sample-details">
      <div class="producttype-item ${productTag}">${productName}</div>
      <p class="sample-title" title="${sample.title}">${sample.title}</p>
      <p class="sample-description" title='${escapedDescription}'>${shortDescription}</p>
      <div class="sample-activity">
        ${authorAvatars}
        <div class="activity-details">
          <span class="sample-author" title="${authorsList}">${authorName}</span>
          <span class="sample-date">Modified ${dtModified.toDateString()}</span>
        </div>
      </div>
    </div>
  </div>
</a>`);

       return $items;
      } catch (error) {
        console.log("Error with one sample", error, sample);
      }
      return null;
}
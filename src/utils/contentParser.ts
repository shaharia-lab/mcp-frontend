// src/utils/contentParser.ts
import {marked} from 'marked';

export class ContentParser {
    static async parse(content: string): Promise<string> {
        // Extract footnotes for later use
        const footnotes: Record<string, string> = {};
        // Modified regex to be more strict about footnote definitions
        const footnoteDefRegex = /^\[\^(\d+)\]:\s*((?:.|\n(?!\[\^|\n))*)/gm;

        let footnoteMatch;
        let contentWithoutFootnoteDefs = content;

        // Keep track of processed footnotes to avoid duplicates
        const processedIds = new Set();

        // Extract footnote definitions and store them
        while ((footnoteMatch = footnoteDefRegex.exec(content)) !== null) {
            const id = footnoteMatch[1];

            // Skip if we've already processed this footnote ID
            if (processedIds.has(id)) continue;

            const text = footnoteMatch[2].trim();
            footnotes[id] = text;
            processedIds.add(id);

            // Remove footnote definitions from content
            contentWithoutFootnoteDefs = contentWithoutFootnoteDefs.replace(footnoteMatch[0], '');
        }

        // Convert footnote references while preserving surrounding content
        const contentWithFootnoteRefs = contentWithoutFootnoteDefs.trim().replace(
            /\[\^(\d+)\]/g,
            (_, id) => `<sup class="footnote-ref"><a href="#footnote-${id}" id="footnote-ref-${id}">${id}</a></sup>`
        );

        // Process with marked
        let html = marked(contentWithFootnoteRefs);

        // Add footnotes section if we have any
        if (Object.keys(footnotes).length > 0) {
            let footnotesHtml = '<div class="footnotes"><details><summary>Sources</summary><ol>';

            for (const [id, text] of Object.entries(footnotes)) {
                footnotesHtml += `
          <li id="footnote-${id}">
            ${text}
            <a href="#footnote-ref-${id}" title="Go back to reference">&uarr;</a>
          </li>
        `;
            }

            footnotesHtml += '</ol></details></div>';
            html += footnotesHtml;
        }

        return html;
    }
}
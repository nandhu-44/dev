import { supabaseClient } from './supabaseClient.js';

async function checkTestData(dbName = 'testing') {
    let { data: testing, error } = await supabaseClient
        .from(dbName)
        .select('*');
    if (error) return alert('An error occurred while fetching data');
    if (!testing.length) return alert('No data found');
    const tableData = populateDataInHTML(testing);
    document.getElementById('table-body').innerHTML = tableData;
}

function populateDataInHTML(data) {
    return data.map(({ id, created_at, name }) => `
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        ${id}
    </th>
    <td class="px-6 py-4">
        ${name}
    </td>
    <td class="px-6 py-4">
        ${created_at}
    </td>
</tr>
    `).join('');
}

document.getElementById('check-btn').onclick = () => checkTestData?.('testing');
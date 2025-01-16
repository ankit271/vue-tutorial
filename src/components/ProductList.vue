<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const productDetails = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Sorting
const sortBy = ref('id');
const sortDirection = ref('asc');

// Filtering
const searchQuery = ref('');
const filterCompleted = ref('all'); // 'all', 'completed', 'incomplete'


// Computed Properties
const filteredData = computed(() => {
  let filtered = [...productDetails.value];
  
  // Apply search filter
  if (searchQuery.value) {
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  // Apply completion filter
  if (filterCompleted.value !== 'all') {
    filtered = filtered.filter(item => 
      filterCompleted.value === 'completed' ? item.completed : !item.completed
    );
  }
  
  // Apply sorting
  filtered.sort((a, b) => {
    let modifier = sortDirection.value === 'asc' ? 1 : -1;
    if (a[sortBy.value] < b[sortBy.value]) return -1 * modifier;
    if (a[sortBy.value] > b[sortBy.value]) return 1 * modifier;
    return 0;
  });
  
  return filtered;
});

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredData.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => 
  Math.ceil(filteredData.value.length / itemsPerPage.value)
);

// Methods
const toggleSort = (column) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = column;
    sortDirection.value = 'asc';
  }
};


onMounted(() => {
  fetchData();
});

const fetchData = async () => {
 try {
    isLoading.value = true;
    error.value = null;
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    productDetails.value = response.data;
  } catch (err) {
    error.value = 'Failed to fetch data. Please try again later.';
    console.error('Error fetching data:', err);
  } finally {
    isLoading.value = false;
  }    
}

const deleteProduct = async (id) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    // Remove item from local state
    productDetails.value = productDetails.value.filter(item => item.id !== id);
  } catch (err) {
    error.value = 'Failed to delete item';
    console.error('Error deleting item:', err);
  }
};

const updateProduct = async (item) => {
  try {
    const updatedItem = { ...item, completed: !item.completed };
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${item.id}`,
      updatedItem
    );
    // Update item in local state
    const index = productDetails.value.findIndex(p => p.id === item.id);
    if (index !== -1) {
      productDetails.value[index] = response.data;
    }
  } catch (err) {
    error.value = 'Failed to update item';
    console.error('Error updating item:', err);
  }
}


</script>
 <template>
  <div class="container-wrapper">
     <div class="content-container">
    <!-- Filters -->
    <div class="filters mb-3">
      <div class="row g-3">
        <div class="col-md-6">
          <input v-model="searchQuery" type="text" class="form-control" placeholder="Search by title...">
        </div>
        <div class="col-md-3">
          <select v-model="filterCompleted" class="form-select">
            <option value="all">All Items</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <div class="col-md-3">
          <select v-model="itemsPerPage" class="form-select">
            <option :value="5">5 per page</option>
            <option :value="10">10 per page</option>
            <option :value="20">20 per page</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-if="isLoading" class="loading">
      Loading...
    </div>

    <template v-else>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th @click="toggleSort('id')" class="sortable">
              ID
              <span v-if="sortBy === 'id'" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="toggleSort('title')" class="sortable">
              Title
              <span v-if="sortBy === 'title'" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="toggleSort('completed')" class="sortable">
              Completed
              <span v-if="sortBy === 'completed'" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>
              <span :class="item.completed ? 'text-success' : 'text-danger'">
                {{ item.completed ? 'Yes' : 'No' }}
              </span>
            </td>
            <td>
              <button @click="updateProduct(item)" class="btn btn-sm btn-primary me-2">
                Update
              </button>
              <button @click="deleteProduct(item.id)" class="btn btn-sm btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination-controls" v-if="totalPages > 1">
        <button class="btn btn-secondary" :disabled="currentPage === 1" @click="currentPage--">
          Previous
        </button>
        <span class="mx-2">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button class="btn btn-secondary" :disabled="currentPage === totalPages" @click="currentPage++">
          Next
        </button>
      </div>
    </template>
    </div>
  </div>
</template>

<style scoped>

.filters {
  margin-bottom: 20px;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sort-indicator {
  margin-left: 5px;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

th:hover {
  background-color: #f8f9fa;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.me-2 {
  margin-right: 0.5rem;
}

.container-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
}

.content-container {
  width: 100%;
  max-width: 1200px; /* Adjust this value based on your needs */
}

/* Your existing styles remain unchanged */
.loading {
  text-align: center;
  padding: 20px;
}
</style>


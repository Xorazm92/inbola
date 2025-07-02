
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

interface TestResult {
  endpoint: string;
  method: string;
  status: 'PASS' | 'FAIL';
  statusCode?: number;
  responseTime?: number;
  error?: string;
}

async function testEndpoint(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: any
): Promise<TestResult> {
  const startTime = Date.now();
  
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      timeout: 10000,
      validateStatus: (status) => status < 500, // Don't throw on 4xx errors
    });
    
    const responseTime = Date.now() - startTime;
    
    return {
      endpoint,
      method,
      status: 'PASS',
      statusCode: response.status,
      responseTime,
    };
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    
    return {
      endpoint,
      method,
      status: 'FAIL',
      statusCode: error.response?.status,
      responseTime,
      error: error.message,
    };
  }
}

async function runTests() {
  console.log('🧪 Starting API Tests...\n');
  
  const tests = [
    // Health & Documentation
    { method: 'GET' as const, endpoint: '/api/health' },
    { method: 'GET' as const, endpoint: '/api/docs' },
    
    // Products API
    { method: 'GET' as const, endpoint: '/api/products' },
    { method: 'GET' as const, endpoint: '/api/products?limit=5' },
    { method: 'GET' as const, endpoint: '/api/products?category=toys' },
    { method: 'GET' as const, endpoint: '/api/products?search=robot' },
    
    // Categories API
    { method: 'GET' as const, endpoint: '/api/categories' },
    
    // Admin endpoints (will likely fail without auth)
    { method: 'GET' as const, endpoint: '/api/admin/products' },
  ];
  
  const results: TestResult[] = [];
  
  for (const test of tests) {
    process.stdout.write(`Testing ${test.method} ${test.endpoint}... `);
    const result = await testEndpoint(test.method, test.endpoint);
    results.push(result);
    
    if (result.status === 'PASS') {
      console.log(`✅ ${result.statusCode} (${result.responseTime}ms)`);
    } else {
      console.log(`❌ ${result.statusCode || 'ERROR'} (${result.responseTime}ms)`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    }
  }
  
  // Summary
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const avgResponseTime = results
    .filter(r => r.responseTime)
    .reduce((acc, r) => acc + (r.responseTime || 0), 0) / results.length;
  
  console.log('\n📊 Test Summary:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏱️  Average Response Time: ${avgResponseTime.toFixed(2)}ms`);
  console.log(`🎯 Success Rate: ${((passed / results.length) * 100).toFixed(1)}%`);
  
  if (failed > 0) {
    console.log('\n❌ Failed Tests:');
    results
      .filter(r => r.status === 'FAIL')
      .forEach(result => {
        console.log(`  ${result.method} ${result.endpoint} - ${result.error || 'Unknown error'}`);
      });
  }
}

if (require.main === module) {
  runTests().catch(console.error);
}

export { runTests };

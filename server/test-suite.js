const fetch = globalThis.fetch || require('node-fetch');

const BASE_URL = 'http://localhost:5001';

async function runTests() {
  console.log('🧪 Starting End-to-End API & CMS Integration Test Suite...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Healthcheck
    console.log('1. Testing Health Endpoint:');
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthRes.json();
    assert(healthData.status === 'online', 'Server reports online status');
    assert(healthData.service.includes('Kavindu Nimesh'), 'Service identity matches');

    // 2. Public Portfolio Data
    console.log('\n2. Testing Public Portfolio Aggregated Endpoint:');
    const portRes = await fetch(`${BASE_URL}/api/public/portfolio`);
    const portData = await portRes.json();
    assert(portData.success === true, 'Portfolio API call succeeds');
    assert(portData.data?.about?.name === 'Kavindu Nimesh', 'About profile contains Kavindu Nimesh');
    assert(portData.data?.projects?.length >= 4, `Loaded ${portData.data?.projects?.length} projects`);
    assert(portData.data?.services?.length === 6, `Loaded ${portData.data?.services?.length} services (all 6 core services present)`);
    assert(portData.data?.skills?.length >= 20, `Loaded ${portData.data?.skills?.length} categorized skills`);
    assert(portData.data?.testimonials?.length >= 4, `Loaded ${portData.data?.testimonials?.length} client testimonials`);

    // 3. Dynamic Case Study Endpoint
    console.log('\n3. Testing Dynamic Case Study /api/public/projects/bharana-books:');
    const caseRes = await fetch(`${BASE_URL}/api/public/projects/bharana-books`);
    const caseData = await caseRes.json();
    assert(caseData.success === true, 'Case study found for Bharana Books');
    assert(caseData.data?.project?.title.includes('Bharana Books'), 'Title matches');
    assert(caseData.data?.project?.features?.length > 0, 'Features array present');
    assert(caseData.data?.project?.challenge !== '', 'Challenge description present');

    // 4. Contact Form Submission
    console.log('\n4. Testing Public Contact Form Submission:');
    const contactRes = await fetch(`${BASE_URL}/api/public/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sarah Connor',
        email: 'sarah@skyline-tech.com',
        phone: '+94 77 999 8888',
        project_type: 'E-Commerce Platform',
        budget: '$3,000 - $5,000',
        message: 'Looking to build a next-generation AI e-commerce store with Kavindu.'
      })
    });
    const contactData = await contactRes.json();
    assert(contactData.success === true, 'Contact message submitted successfully');
    const newMsgId = contactData.data?.id;

    // 5. Admin Authentication
    console.log('\n5. Testing Admin Authentication (Login & JWT):');
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@kavindu.dev',
        password: 'Admin@2026!'
      })
    });
    const loginData = await loginRes.json();
    assert(loginData.success === true, 'Admin login succeeded with correct credentials');
    assert(!!loginData.token, 'JWT token issued');
    const token = loginData.token;

    // 6. Admin Session Verification
    console.log('\n6. Testing Admin Session Verification:');
    const verifyRes = await fetch(`${BASE_URL}/api/auth/verify`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const verifyData = await verifyRes.json();
    assert(verifyData.success === true, 'Session successfully verified');
    assert(verifyData.admin?.email === 'admin@kavindu.dev', 'Verified admin identity matches');

    // 7. Admin Dashboard Metrics
    console.log('\n7. Testing Admin Dashboard Metrics:');
    const dashRes = await fetch(`${BASE_URL}/api/admin/dashboard`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const dashData = await dashRes.json();
    assert(dashData.success === true, 'Dashboard data loaded');
    assert(dashData.data?.stats?.totalProjects >= 4, 'Total projects counted in stats');
    assert(dashData.data?.stats?.totalMessages >= 1, 'Total messages counted in stats');

    // 8. Admin Project CRUD
    console.log('\n8. Testing Admin Projects CRUD:');
    // Create
    const createProjRes = await fetch(`${BASE_URL}/api/admin/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        title: 'Quantum Cloud Engine',
        slug: 'quantum-cloud-engine',
        category: 'Custom Web Applications',
        client: 'Quantum AI Labs',
        year: '2026',
        short_description: 'Automated distributed node manager',
        technologies: ['React', 'Node.js', 'WebSockets'],
        image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475'
      })
    });
    const createProjData = await createProjRes.json();
    assert(createProjData.success === true, 'Admin successfully created a new project');
    const testProjId = createProjData.data?.id;

    // Update
    const updateProjRes = await fetch(`${BASE_URL}/api/admin/projects/${testProjId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        short_description: 'Updated short description with sub-second execution'
      })
    });
    const updateProjData = await updateProjRes.json();
    assert(updateProjData.success === true, 'Admin successfully updated the project');

    // Delete
    const deleteProjRes = await fetch(`${BASE_URL}/api/admin/projects/${testProjId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const deleteProjData = await deleteProjRes.json();
    assert(deleteProjData.success === true, 'Admin successfully deleted test project');

    // 9. Admin Message Inbox & Status Update
    console.log('\n9. Testing Admin Messages & Mark as Read:');
    const msgRes = await fetch(`${BASE_URL}/api/admin/messages`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const msgData = await msgRes.json();
    const foundMsg = msgData.data?.find(m => m.id === newMsgId);
    assert(!!foundMsg, 'Contact inquiry from Step 4 appeared in Admin Messages inbox');

    const markReadRes = await fetch(`${BASE_URL}/api/admin/messages/${newMsgId}/read`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ is_read: 1 })
    });
    const markReadData = await markReadRes.json();
    assert(markReadData.success === true, 'Message marked as read');

    // Delete test message
    await fetch(`${BASE_URL}/api/admin/messages/${newMsgId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    console.log('\n----------------------------------------');
    console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('----------------------------------------');

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal error during testing:', err);
    process.exit(1);
  }
}

runTests();

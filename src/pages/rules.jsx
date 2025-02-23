import React, { useState } from 'react';
import '../styles/rules-manager.css';

export const RulesPage = () => {
  const [ruleText, setRuleText] = useState('');
  const [rules, setRules] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Add new rule
  const addRule = () => {
    if (!ruleText.trim()) return;
    const newRule = {
      id: Date.now(),
      rule: ruleText,
      date_created: new Date().toISOString(),
      status: 'active',
      category: 'custom'
    };
    setRules([...rules, newRule]);
    setRuleText('');
  };

  // Delete rule
  const deleteRule = (id) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  // Toggle rule status
  const toggleRuleStatus = (id) => {
    setRules(rules.map(rule => 
      rule.id === id 
        ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
        : rule
    ));
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  // Filter rules based on search
  const filteredRules = rules.filter(rule =>
    rule.rule.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rules-page">
      <div className="rules-header">
        <div className="header-content">
          <h1>Safety Rules Manager</h1>
          <p className="subtitle">Define and manage workplace safety rules</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-value">{rules.length}</span>
            <span className="stat-label">Total Rules</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {rules.filter(r => r.status === 'active').length}
            </span>
            <span className="stat-label">Active Rules</span>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="rules-grid">
          {/* Rule Creation Card */}
          <div className="content-card">
            <div className="card-header">
              <h2>Create New Rule</h2>
            </div>
            <div className="card-content">
              <div className="input-group">
                <label htmlFor="rule-input">Rule Description</label>
                <div className="input-with-button">
                  <input
                    id="rule-input"
                    type="text"
                    placeholder="Enter safety rule..."
                    value={ruleText}
                    onChange={e => setRuleText(e.target.value)}
                  />
                  <button 
                    className="add-button"
                    onClick={addRule}
                    disabled={!ruleText.trim()}
                  >
                    Add Rule
                  </button>
                </div>
              </div>
              
              <div className="upload-section">
                <h3>Import Rules from PDF</h3>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="file-input-label">
                    {selectedFile ? selectedFile.name : 'Choose PDF file'}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Rules List Card */}
          {rules.length > 0 && (
            <div className="content-card">
              <div className="card-header">
                <h2>Safety Rules</h2>
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search rules..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="table-container">
                <table className="rules-table">
                  <thead>
                    <tr>
                      <th>Rule</th>
                      <th>Status</th>
                      <th>Date Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRules.map(rule => (
                      <tr key={rule.id}>
                        <td className="rule-text">{rule.rule}</td>
                        <td>
                          <span className={`status-badge ${rule.status}`}>
                            {rule.status}
                          </span>
                        </td>
                        <td className="date-cell">
                          {new Date(rule.date_created).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="icon-button toggle"
                              onClick={() => toggleRuleStatus(rule.id)}
                            >
                              {rule.status === 'active' ? 'Disable' : 'Enable'}
                            </button>
                            <button 
                              className="icon-button delete"
                              onClick={() => deleteRule(rule.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
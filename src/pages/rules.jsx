import React, { useState } from 'react';


export const RulesPage = () => {
  const [ruleText, setRuleText] = useState('');
  const [rules, setRules] = useState([]);
  const [file, setFile] = useState()

  // Adds a new rule if the input is not empty.
  const addRule = () => {
    if (!ruleText.trim()) return;
    const newRule = {
      // Using Date.now() for simplicity; in a real app you might use a UUID library.
      id: Date.now(),
      rule: ruleText,
      date_created: new Date().toISOString(),
    };
    setRules([...rules, newRule]);
    setRuleText('');
  };

  // Deletes a rule by filtering it out of the current rules array.
  const deleteRule = (id) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <div>
        <div className="rule-manager">
        <h2>Rule Manager</h2>
        <div className="input-section">
            <input
            type="text"
            placeholder="Enter rule..."
            value={ruleText}
            onChange={e => setRuleText(e.target.value)}
            />
            <button onClick={addRule}>Add</button>
        </div>
        {rules.length > 0 && (
            <table className="rules-table">
            <thead>
                <tr>
                <th>Rule</th>
                <th>Date Created</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rules.map(rule => (
                <tr key={rule.id}>
                    <td>{rule.rule}</td>
                    <td>{new Date(rule.date_created).toLocaleString()}</td>
                    <td>
                    <button onClick={() => deleteRule(rule.id)}>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        <style jsx>{`
            .rule-manager {
            margin: 20px;
            font-family: Arial, sans-serif;
            }
            .input-section {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            }
            .input-section input {
            flex: 1;
            padding: 8px;
            font-size: 1rem;
            margin-right: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            }
            .input-section button {
            padding: 8px 16px;
            font-size: 1rem;
            background-color: #000;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            }
            .input-section button:hover {
            background-color: #444;
            }
            .rules-table {
            width: 100%;
            border-collapse: collapse;
            }
            .rules-table th, .rules-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
            }
            .rules-table th {
            background-color: #f4f4f4;
            }
            .rules-table button {
            padding: 4px 8px;
            font-size: 0.9rem;
            background-color: red;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            }
            .rules-table button:hover {
            background-color: darkred;
            }
        `}</style>
        </div>
        <div className="rule-manager">
            <h2>Upload PDF</h2>
            <input type="file" accept=".pdf" onChange={(event) => this.setFile({ selectedFile: event.target.files[0] })} />
        </div>
    </div>
  );
};



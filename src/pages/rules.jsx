import React, { useState, useEffect } from 'react';
import '../styles/rules-manager.css';
import { BASE_API_URL } from '../constants';
import { USER_ID } from '../constants';

export const RulesPage = ({ImportantId}) => {
  const [ruleText, setRuleText] = useState('');
  const [rules, setRules] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // States for room selection
  const [allRooms, setAllRooms] = useState([]);          // list of all available rooms from the API
  const [selectedRooms, setSelectedRooms] = useState([]); // array of selected room IDs
  const [selectAll, setSelectAll] = useState(false);      // whether "All" is selected
  const [showDropdown, setShowDropdown] = useState(false); // controls open/close of dropdown

  // 1. Fetch ALL rooms on component mount
  useEffect(() => {
    // GET /rooms?user_id=YOUR_USER_UUID
    fetch(`${BASE_API_URL}/rooms?user_id=${USER_ID}`)
      .then(res => res.json())
      .then(data => {
        setAllRooms(data);
      })
      .catch(err => console.error('Error fetching rooms:', err));
  }, []);

  // 2. Fetch the rules on component mount
  useEffect(() => {
    // GET /rules?user_id=YOUR_USER_UUID
    fetch(`${BASE_API_URL}/rules?user_id=${USER_ID}`)
      .then(res => res.json())
      .then(data => {
        // 'data' is an array with user objects; each user object has a "rules" array
        if (Array.isArray(data) && data.length > 0) {
          const fetchedRules = data[0].rules.map(rule => {
            return {
              ...rule,
              status: 'active',              // local status, default "active"
              date_created: new Date().toISOString() // or any placeholder date
            };
          });
          setRules(fetchedRules);
        }
      })
      .catch(err => console.error('Error fetching rules:', err));
  }, []);

  // 3. Add new rule (local state + POST to API)
  const addRule = async () => {
    if (!ruleText.trim()) return;

    // Prepare payload for the backend
    const payload = {
      text: ruleText,
      user_id: USER_ID
    };

    // If "All" is selected
    if (selectAll) {
      payload.shared = true;
    } else {
      // If specific rooms are selected
      payload.shared = false;
      payload.rooms_ids = selectedRooms;
    }

    try {
      const response = await fetch(`${BASE_API_URL}/rules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error('Failed to add rule. Status:', response.status);
        // Handle any error feedback to user here
        return;
      }

      // Assuming the response returns the newly created rule object (with an 'id')
      const createdRule = await response.json();

      // Construct a local version of the rule
      const newLocalRule = {
        ...createdRule, 
        status: 'active',
        date_created: new Date().toISOString(),
        // If the API doesn't return rooms, we replicate them from local selection:
        rooms: payload.shared
          ? [] 
          : allRooms.filter(room => selectedRooms.includes(room.id))
      };

      // Update local state
      setRules(prev => [...prev, newLocalRule]);

      // Reset inputs
      setRuleText('');
      setSelectAll(false);
      setSelectedRooms([]);
      setShowDropdown(false);

    } catch (error) {
      console.error('Failed to add rule:', error);
    }
  };

  // 4. Delete rule (local only in this example)
  const deleteRule = (id) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  // 5. Toggle rule status (local only in this example)
  const toggleRuleStatus = (id) => {
    setRules(rules.map(rule =>
      rule.id === id
        ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
        : rule
    ));
  };

  // 6. Handle file selection (PDF only)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  // 7. Filter rules based on search query (search by rule.text)
  const filteredRules = rules.filter(rule =>
    rule.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 8. Handle the "select all" checkbox
  const handleSelectAll = () => {
    // If turning "All" on, clear the individually selected rooms
    if (!selectAll) {
      setSelectedRooms([]);
    }
    setSelectAll(!selectAll);
  };

  // 9. Handle the selection of an individual room
  const handleRoomCheckbox = (roomId) => {
    if (selectedRooms.includes(roomId)) {
      setSelectedRooms(selectedRooms.filter(id => id !== roomId));
    } else {
      setSelectedRooms([...selectedRooms, roomId]);
    }
  };

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
                    style={{ width: '80%' }}
                  />
                  <button
                    className="add-button"
                    onClick={addRule}
                    disabled={!ruleText.trim()}
                    style={{ width: '20%' }}
                  >
                    Add Rule
                  </button>
                </div>
              </div>

              {/* Rooms Selection Dropdown */}
              <div className="rooms-dropdown-container">
                <button
                  className="rooms-dropdown-toggle"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {selectAll ? 'All Rooms Selected' : 'Select Rooms'}
                </button>

                {showDropdown && (
                  <div className="rooms-dropdown-menu">
                    <div className="rooms-dropdown-item">
                      <label>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                        All
                      </label>
                    </div>
                    {/* List individual rooms if not "All" */}
                    {!selectAll && allRooms.map(room => (
                      <div className="rooms-dropdown-item" key={room.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedRooms.includes(room.id)}
                            onChange={() => handleRoomCheckbox(room.id)}
                          />
                          {room.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upload PDF Section */}
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
                      <th>Rule & Rooms</th>
                      <th>Status</th>
                      <th>Date Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRules.map(rule => (
                      <tr key={rule.id}>
                        <td className="rule-text">
                          {/* Display the rule text */}
                          <strong>{rule.text}</strong>
                          {/* If shared, show ALL. Otherwise, show each room */}
                          {rule.shared ? (
                            <div className="room-tags">
                              <span className="room-tag">ALL</span>
                            </div>
                          ) : (
                            <div className="room-tags">
                              {rule.rooms && rule.rooms.map(room => (
                                <span key={room.id} className="room-tag">{room.name}</span>
                              ))}
                            </div>
                          )}
                        </td>
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

          {/* If no rules yet, you could display an empty state message */}
          {rules.length === 0 && (
            <div className="content-card">
              <div className="empty-state">
                <p>No rules found. Add your first rule above.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Sparkles, X, Lock, Mail, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { playClickSound } from '../../utils/audioEffects';
import styles from './AuthModal.module.css';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register, demoLogin, actionLoading } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    playClickSound();

    if (isLoginTab) {
      const res = await login(email, password);
      if (res.success) {
        onClose();
      } else {
        setFormError(res.error);
      }
    } else {
      if (!name) {
        setFormError('Name is required.');
        return;
      }
      const res = await register(name, email, password);
      if (res.success) {
        onClose();
      } else {
        setFormError(res.error);
      }
    }
  };

  const handleDemoLogin = async () => {
    playClickSound();
    const res = await demoLogin();
    if (res.success) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <button className={styles.closeBtn} onClick={onClose} title="Close">
          <X size={16} />
        </button>

        <h3 className="h5 fw-bold text-white text-center mb-3">Welcome to VELoop Rewards</h3>

        {/* 1-Click Demo Login */}
        <button className={styles.demoBtn} onClick={handleDemoLogin} disabled={actionLoading}>
          <Sparkles size={18} />
          <span>{actionLoading ? 'Connecting...' : '1-Click Evaluator Demo Login'}</span>
        </button>

        <div className="text-center text-muted small mb-3">— or sign in with credentials —</div>

        {/* Tabs */}
        <div className="d-flex justify-content-center gap-2 mb-3">
          <button
            className={`${styles.tabBtn} ${isLoginTab ? styles.tabBtnActive : ''}`}
            onClick={() => {
              playClickSound();
              setIsLoginTab(true);
            }}
          >
            Login
          </button>
          <button
            className={`${styles.tabBtn} ${!isLoginTab ? styles.tabBtnActive : ''}`}
            onClick={() => {
              playClickSound();
              setIsLoginTab(false);
            }}
          >
            Register
          </button>
        </div>

        {formError && <div className="alert alert-danger py-2 small mb-3">{formError}</div>}

        <form onSubmit={handleSubmit}>
          {!isLoginTab && (
            <div className="position-relative">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-bold rounded-3"
            style={{
              background: 'linear-gradient(135deg, #00e5ff 0%, #2979ff 100%)',
              border: 'none',
              color: '#000'
            }}
            disabled={actionLoading}
          >
            {actionLoading ? 'Processing...' : isLoginTab ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

import { Injectable } from '@angular/core';
import {
  AndroidBiometricCryptoPreference,
  BrowserVault, Device, DeviceSecurityType,
  IdentityVaultConfig, Vault, VaultErrorCodes, VaultType
} from '@ionic-enterprise/identity-vault';

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  config: IdentityVaultConfig = {
    key: 'cs.ionic.iv-chunk',
    type: VaultType.DeviceSecurity,
    deviceSecurityType: DeviceSecurityType.Biometrics,
    androidBiometricsPreferStrongVaultOrSystemPasscode: AndroidBiometricCryptoPreference.StrongVault,
    shouldClearVaultAfterTooManyFailedAttempts: false,
    unlockVaultOnLoad: false
  };


  vault: Vault = new Vault();

  constructor() { }

  async init() {
    this.vault.initialize(this.config);
    this.vault.onConfigChanged(() => {
      console.log('Vault configuration was changed', this.config);
    });
    this.vault.onLock(() => {
      console.log('Vault was locked');
    });
    this.vault.onUnlock(() => {
      console.log('Vault was unlocked');
    });
    this.vault.onError(async (err) => {
      console.error('Vault error', err);
    });
  }
}

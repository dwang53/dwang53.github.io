---
name: skill-telemac
description: Professional workflow for installing, configuring, and running OpenTelemac-Mascaret with Intel oneAPI. Use for HPC setup, parallel simulation management, and result post-processing.
---

# OpenTelemac HPC Workflow

## 1. Environment Initialization
Always source the oneAPI and Telemac environment before any operation:
```bash
source /opt/intel/oneapi/setvars.sh > /dev/null 2>&1
export HOMETEL=~/Downloads/opentelemac/v9p1r0
export PATH=$HOMETEL/scripts/python3:$PATH
export PYTHONPATH=$HOMETEL/scripts/python3
export BUILD_DIR=$HOMETEL/builds/HEAD_ifx_release
```

## 2. Compilation (ifx + Intel MPI)
Use the helper script for optimized builds:
```bash
python3 scripts/python3/build_telemac.py --fc ifx --deps mpi -j 8
```

## 3. Parallel Execution
Ensure `PARALLEL PROCESSORS` is set in the `.cas` file or use `--ncsize N`.
```bash
telemac3d.py study.cas --ncsize 8
```

## 4. User Fortran Customization
- Create a `user_fortran` directory.
- Set `FORTRAN FILE : 'user_fortran'` in the `.cas` file.
- Common files to override: `user_suspension_cae.f` (for custom entrainment).

## 5. Post-Processing with Python API
Use the `TelemacFile` class for robust data extraction:
```python
from data_manip.extraction.telemac_file import TelemacFile
res = TelemacFile('results.slf')
# For 3D: data = res.get_data_value('VARIABLE NAME', record_index)
# Reshape: data_3d = data.reshape((res.nplan, res.npoin2))
```
